import React, { useState, useRef, useEffect } from 'react';
import { Paper, Fab, Typography } from '@material-ui/core';
import { ReactComponent as PlusIcon } from '../plus-icon.svg';
import { ReactComponent as MinusIcon } from '../minus-icon.svg';
import Draggable from "react-draggable";
import TransparentFab from "./TransparentFab";
import { useSpring, animated, config, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { clamp } from 'lodash';

export default function ZoomBar(props) {
  let fabSize = 70;
  let maxHeight = 240;
  // const [zoom, setZoom] = useState(100) // useSpring(() => ({ zoom: 100 }));
  const [{ zoom }, setZoom] = useSpring(() => ({ zoom: 100, config: {
    friction: 50, 
    tension: 600,
  }}));
  // const { z } = useSpring({ 
  //   from: { z: 0 }, 
  //   z: 100
  // });

  const zoomClick = dir => {
    // zoom in a particular direction
    const z = Math.sign(dir) * 1e-1 * zoom.value;
    setZoom({ zoom: zoom.value + z });
  }

  return (
    <div style={{
        width: fabSize,
        display: "flex"
      }}>
        <Paper style={{
          borderRadius: "5em",
          maxHeight: maxHeight,
          margin: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "space-between",
        }}>
          <TransparentFab onClick={c => zoomClick(-1)}>
            <MinusIcon />
          </TransparentFab>
          <div style={{
            height: fabSize,
            position: "relative",
          }}>
            <ZoomBarFab diameter={fabSize} zoom={zoom} zoomControl={setZoom} />
          </div>
          <TransparentFab onClick={c => zoomClick(1)}>
            <PlusIcon />
          </TransparentFab>
        </Paper>
      </div>
  )
}

export function ZoomBarFab(props) {
  const [{ y }, set] = useSpring(() => ({ y: 0, config: {
     friction: 30, 
     tension: 400,
     clamp: true,
  }}))
  
  const [zoom, setZoom] = [props.zoom, props.zoomControl];
  
  const [gestureDown, setGestureDown] = useState(false);
  const [zoomMult, setZoomMult] = useState(0);
  const ref = React.useRef(null);
  
  const reset = () => {
    setZoom({ zoom: 100 });
  }

  // https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  
  useInterval(() => {
    console.log(`updating zoom with ${zoomMult}:`);
    console.log(zoom);
    // const z = clamp(zoom + 2 * 3e-5 * (zoom ** 0.75) * zoomMult, 0.01, 9999);
    // const z = clamp(zoom + 2 * 3e-5 * (zoom ** 0.75) * zoomMult, 0.01, 9999);
    // console.log(
    //   clamp(zoom.value + 2 * 3e-5 * (zoom.value ** 0.75) * zoomMult, 0.01, 9999)
    //   )
    const z = clamp(zoom.value + 2 * 3e-5 * (zoom.value ** 0.75) * zoomMult, 0.01, 9999)
    // const z = calcZoom(zoom.value);
    setZoom({ zoom: z });
  }, gestureDown ? 50 : null);

  const bind = useDrag(({ down, movement: [x, y], event, first, last }) => {
    // only prevent default between first and last event
    // first: prevents browser events
    // last: allows buttons to activate and ripple
    (!first && !last) && event.preventDefault();
    
    // tell zoom listener if drag is happening
    setGestureDown(down);
    
    const limit = 80;
    const clampY = clamp(y, -limit, limit)
    
    setZoomMult(down ? -Math.sign(clampY) * Math.abs(clampY / 10)**4 : 0)
    set({ y: down ? clampY : 0 })
    
  }, { event: { passive: false, capture: false }, domTarget: ref })
  
  React.useEffect(bind, [bind])

  return (
    <animated.div 
      ref={ref}
      style={{
        transform: y.interpolate(y => `translate3D(0, ${y}px, 0)`),
        borderRadius: '50rem',
        // background: "hotpink",
        width: props.diameter,
        height: props.diameter,

        marginLeft: -props.diameter/2,
        marginTop: -props.diameter/2,
        top: "50%",
        left: "50%",
        position: "absolute",
        zIndex: "1",
      }} 
      >
      <Fab 
        onClick={ e => {
            // if click registered and fab not moved, trigger reset
            if (y.getValue() === 0) {
              reset();
            }
          }
        }
        style={{
          backgroundColor: "#2196f3",

          width: props.diameter,
          height: props.diameter,
        }}>
        <Typography style={{ color: "#fff" }}>
          <animated.span>{zoom.interpolate(z => z.toFixed(1))}</animated.span>%
        </Typography>
      </Fab>
    </animated.div>
  )
}

// export default class ZoomBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       zoom: 100,
//       mult: 0,
//       actual: 0,
//     };

//     this.zoomDrag = this.zoomDrag.bind(this);
//   }

//   zoomDrag() {
//     this.setState((prev, props) => ({
//       zoom: this.state.zoom + 0.01 * this.state.mult,
//     }));
//   }

//   render() {
//     let fabSize = 70;

//     let maxWidth = 240;

//     return (
//       <div style={{
//         height: "80px",
//         display: "flex"
//       }}>
//         <Paper style={{
//           borderRadius: "5em",
//           maxWidth: maxWidth,
//           margin: "auto",
//           display: "flex",
//           justifyContent: "space-between",
//         }}>
//           <TransparentButton>
//             <MinusIcon />
//           </TransparentButton>
//           <div style={{
//             width: fabSize+20,
//             position: "relative",
//           }}>
//             <Draggable
//               axis="x"
//               bounds={{ left: -80, right: 80 }}
//               position={{ x: 0, y: 0 }}
//               onStart={e => this.setState({
//                 zoomDragInterval: setInterval(this.zoomDrag, 25)
//               })}
//               onStop={e => {
//                 clearInterval(this.state.zoomDragInterval);
//                 this.setState({
//                   actual: 0,
//                   mult: 0
//                 })
//               }}
//               onDrag={e => {
//                 // console.log(e);
//                 // let prev = this.state.mult
//                 let actual = this.state.actual
//                 let mult = Math.max(-80, Math.min(actual + e.movementX, 80)) / 8
//                 this.setState({
//                   actual: actual + e.movementX,
//                   mult: mult ** 2 * Math.sign(mult)
//                 })
//                 // (state, props) => ({
//                 //   zoom: state.zoom + 0.01*mult
//                 // })
//               }}
//             >
//               <Fab style={{
//                 // boxShadow: "none",
//                 backgroundColor: "#2196f3",

//                 width: fabSize,
//                 marginLeft: -fabSize/2,
//                 left: "50%",

//                 height: fabSize,
//                 marginTop: -fabSize/2,
//                 top: "50%",

//                 position: "absolute",
//                 zIndex: "1",
//               }}>
//                 <Typography style={{ color: "#fff" }}>
//                   {this.state.zoom.toFixed(1)}%
//                   </Typography>
//               </Fab>
//             </Draggable>
//           </div>
//           <TransparentButton>
//             <PlusIcon />
//           </TransparentButton>
//         </Paper>
//       </div>
//     )
//   }
// }