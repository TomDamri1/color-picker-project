import size from './sizes/sizes';
import bg from './background.svg';
export default {
    '@global':{
        '.fade-exit':{
            opacity : 1
        },
        '.fade-exit-active':{
            opacity : 0,
            transition : 'opacity 500ms ease-out'
        }
    },
    root: {
        height : '100vh',
        display : 'flex',
        alignItems : 'flex-start',
        justifyContent: 'center',
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,

    },
    heading:{
        fontSize: '2rem'
    },
    container:{
        width : '50%',
        display: 'flex',
        alignItems : 'flex-start',
        flexDirection : 'column',
        flexWrap : 'wrap',
        [size.down('xl')]:{
            width:'75%'
        },
    },
    nav:{
        display:'flex',
        width : '100%',
        justifyContent : 'space-between',
        color : 'white',
        alignItems : 'center',
        '& a': {
            textDecoration : 'none',
            color : 'white',
        },
    },
    palettes:{
        boxSizing: 'border-box',
        width : '100%',
        display : 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '1.5rem',
        [size.down('md')]:{
            gridTemplateColumns: 'repeat(2,50%)',
        },
        [size.down('xs')]:{
            gridTemplateColumns: 'repeat(1,100%)',
        },
    },
}