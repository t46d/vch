/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        electric: '#00F0FF',
        'electric-dark': '#00B8CC',
        neon: {
          pink: '#FF00C8',
          violet: '#B500FF',
          cyan: '#00F0FF',
          green: '#00FF9F',
        },
        dark: {
          950: '#0A0A0A',
          900: '#151515',
          800: '#202020',
        }
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00F0FF 0%, #FF00C8 50%, #B500FF 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00F0FF, #FF00C8)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A, #151515, #202020)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(255, 0, 200, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 0, 200, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        glow: {
          '0%': {
            'box-shadow': '0 0 20px rgba(0, 240, 255, 0.5)',
          },
          '100%': {
            'box-shadow': '0 0 30px rgba(255, 0, 200, 0.8)',
          },
        },
      },
    },
  },
  plugins: [],
}
