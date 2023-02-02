/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'img-rotate': {
          '0%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);'
          }
        },
        'img-rotate-pause': {
          '0%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);',
            'border-radius' : '99999px'
          },
          '100%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);',
          }
        },
        'slide-right-1': {
          '0%': {
            '-webkit-transform': ' translateX(-50px);',
            transform: 'translateX(-50px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left-1': {
          '0%': {
            '-webkit-transform': ' scale(0);',
            transform: 'translateX(100px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'scale-center': {
          '0%': {
            '-webkit-transform': ' scale(0);',
            transform: 'scale(0);'
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },
        'scale-up-img': {
          '0%': {
            '-webkit-transform': ' scale(1);',
            transform: 'scale(1);'
          },
          '100%': {
            '-webkit-transform': 'scale(1.1);',
            transform: 'scale(1.1);'
          }
        },
        'scale-down-img': {
          '0%': {
            '-webkit-transform': ' scale(1.1);',
            transform: 'scale(1.1);'
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },

      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'img-rotate' : 'img-rotate 4.5s linear infinite;',
        'slide-right-1': 'slide-right-1 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left-1': 'slide-left-1 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'img-rotate-pause': 'img-rotate-pause .4s linear 2 both;',
        'scale-center' : 'scale-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-img' : 'scale-up-img 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down-img' : 'scale-down-img 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
    },
    screens: {
      "1600" : "1600px"
    },
  },
  plugins: [],
}