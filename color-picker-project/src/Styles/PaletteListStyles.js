import size from './sizes/sizes';
import bg from './background.svg';
export default {
    root: {
        height : '100vh',
        display : 'flex',
        alignItems : 'flex-start',
        justifyContent: 'center',
        backgroundImage: `url(${bg})`,

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