/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';


const defaultTheme = require('tailwindcss/defaultTheme');
export default {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [PrimeUI],
    theme: {
        fontSize: {
            xs: '0.625rem',
            sm: '0.75rem',
            md: '0.8125rem',
            base: '0.875rem',
            lg: '1rem',
            xl: '1.125rem',
            '2xl': '1.25rem',
            '3xl': '1.5rem',
            '4xl': '2rem',
            '5xl': '2.25rem',
            '6xl': '2.5rem',
            '7xl': '3rem',
            '8xl': '4rem',
            '9xl': '6rem',
            '10xl': '8rem',
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        extend: {
            boxShadow: {
                'card-shadow': '0px 6px 14px -3px rgba(0, 0, 0, 0.11)',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            },
            colors: {
                primary_bg: '#2D6E45',
                login_btn_bg: '#FF8800',
                nav_bg: '#04263C',
                border_color: '#24AD9A',
                growth_and_flag_1_bg: '#45CBB8',
                growth_and_flag_2_bg: '#1F65AE',
                growth_and_flag_3_bg: '#FF9215',
                growth_and_flag_4_bg: '#42B36C',
                join_us_bg: '#6DDBD3',
                initiatives_bg: '#F69321',
                table_header: '#298097',
                blood_red: '#b11111',
                bright_red: '#CF2323',
            },
            flex: {
                0: '0 0 auto',
            },
            fontFamily: {
                sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(',')}`,
                mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(',')}`,
            },
            opacity: {
                12: '0.12',
                38: '0.38',
                87: '0.87',
            },
            rotate: {
                '-270': '270deg',
                15: '15deg',
                30: '30deg',
                60: '60deg',
                270: '270deg',
            },
            scale: {
                '-1': '-1',
            },
            zIndex: {
                '-1': -1,
                49: 49,
                60: 60,
                70: 70,
                80: 80,
                90: 90,
                99: 99,
                999: 999,
                9999: 9999,
                99999: 99999,
            },
            spacing: {
                13: '3.25rem',
                15: '3.75rem',
                18: '4.5rem',
                22: '5.5rem',
                26: '6.5rem',
                30: '7.5rem',
                50: '12.5rem',
                90: '22.5rem',

                // Bigger values
                100: '25rem',
                120: '30rem',
                128: '32rem',
                140: '35rem',
                160: '40rem',
                180: '45rem',
                192: '48rem',
                200: '50rem',
                240: '60rem',
                256: '64rem',
                280: '70rem',
                320: '80rem',
                360: '90rem',
                400: '100rem',
                480: '120rem',

                // Fractional values
                '1/2': '50%',
                '1/3': '33.333333%',
                '2/3': '66.666667%',
                '1/4': '25%',
                '2/4': '50%',
                '3/4': '75%',
            },
            minHeight: ({ theme }) => ({
                ...theme('spacing'),
            }),
            maxHeight: {
                none: 'none',
            },
            minWidth: ({ theme }) => ({
                ...theme('spacing'),
                screen: '100vw',
            }),
            maxWidth: ({ theme }) => ({
                ...theme('spacing'),
                screen: '100vw',
            }),
            transitionDuration: {
                400: '400ms',
            },
            transitionTimingFunction: {
                drawer: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            },
        },
    }
};
