// TODO set max iterations as parameter, crosshair as parameter

// WebGL 

const newSmoothMandelbrotShader = ({
        maxI = 300, 
        AA = 1, 
        B = 64
    },
    crosshair = {
        stroke: 2, // Parameters; stroke = width 
        radius: 100, 
    },
    square = true,
) => `
// Adapted by Joao Maio/2019, based on work by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// See here for more information on smooth iteration count:
// http://iquilezles.org/www/articles/mset_smooth/mset_smooth.htm

// render parameters
#define AA ${AA}
#define MAXI ${maxI}
#define B ${B.toFixed(1)}

// crosshair parameters
#define cross_stroke ${crosshair.stroke.toFixed(1)}
#define cross_radius ${crosshair.radius.toFixed(1)}

#define true 1 // this is read into after taking in sqaure = true  - webgl is top down
#define false 0
// square parameters
#define square ${square} //whereever the square var is, replace it w true; so ${square} corresponds to const newSmoothMandelbrotShader
// first square is used in function below, and so this definintion links it up w ${square} above

// set high float precision (lower than this may break colours on mobile)
precision highp float;

// need to know the resolution of the canvas
uniform vec2 resolution;

// properties should be passed as uniforms
uniform int   u_maxI;  
uniform vec2  u_pos;
uniform float u_zoom;
uniform float u_theta;

bool crosshair( float x, float y ) {
    float abs_x = abs(2.0*x - resolution.x); //normalisation
    float abs_y = abs(2.0*y - resolution.y);

    //Going across each col and each row then decide on
    return 
    // crosshair in centre of screen
    (abs_x <= cross_stroke || abs_y <= cross_stroke) &&
    // crosshair size / "radius"
    (abs_x <= cross_radius && abs_y <= cross_radius);
}

// Georgie
bool squareBool(float x, float y){
    return ((x > -2.0001) && (x < -1.9999) &&(y > -0.0001) && (y < 0.0001));
}

float mandelbrot( in vec2 c ) {
    {
        float c2 = dot(c, c);
        // skip computation inside M1 - http://iquilezles.org/www/articles/mset_1bulb/mset1bulb.htm
        if( 256.0*c2*c2 - 96.0*c2 + 32.0*c.x - 3.0 < 0.0 ) return 0.0;
        // skip computation inside M2 - http://iquilezles.org/www/articles/mset_2bulb/mset2bulb.htm
        if( 16.0*(c2+2.0*c.x+1.0) - 1.0 < 0.0 ) return 0.0;
    }

    float l = 0.0;
    vec2 z  = vec2(0.0);
    for( int i=0; i<MAXI; i++ )
    {
        z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;
        if( dot(z,z)>(B*B) ) break;
        l += 1.0;
    }

    // maxed out iterations
    if( l>float(MAXI)-1.0 ) return 0.0;
    
    // optimized smooth interation count
    l = l - log2(log2(dot(z,z))) + 4.0;

    // if ((c.x > -2.001) && (c.x < -1.999) &&(c.y > -0.001) && (c.y < 0.001))return 0.0;

    // if you've toggled it on, and if this should be part of the square then 
    #if square
     if (squareBool(c.x,c.y)) return 0.0; //does the actual colouring
    #endif


    return l;
}

void main() {    
    // set the initial colour to black
    vec3 col = vec3(0.0);

    // anti-aliasing
    #if AA>1
    for( int m=0; m<AA; m++ )
    for( int n=0; n<AA; n++ )
    {
        // vec2 p = (-iResolution.xy + 2.0*(fragCoord.xy+vec2(float(m),float(n))/float(AA)))/iResolution.y;
        vec2 p = (2.0*(gl_FragCoord.xy + vec2(float(m), float(n)) / float(AA) ) - resolution.xy)/resolution.y;
        float w = float(AA*m+n);
    #else    
        // adjust pixels to range from [-1, 1]
        vec2 p = (2.0*gl_FragCoord.xy - resolution.xy)/resolution.y;
    #endif

    // c is based on offset and grid position, z_0 = 0
    vec2 c = u_pos + p/u_zoom;
    
    float l = mandelbrot(c);
    col += 0.5 + 0.5*cos( 3.0 + l*0.15 + vec3(0.0,0.6,1.0));

    // antialiasing
    #if AA>1
    }
    col /= float(AA*AA);
    #endif

    // add crosshair
    if (crosshair(gl_FragCoord.x, gl_FragCoord.y)) {
        col = 1. - col;
    }

    // Output to screen
    gl_FragColor = vec4( col, 1.0 );
}
`;

export default newSmoothMandelbrotShader;
