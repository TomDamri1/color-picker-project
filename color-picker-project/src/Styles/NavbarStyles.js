export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    logo: {
        marginRight: '15px',
        padding :'0 13px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a' :{
            textDecoration: 'none',
            color : 'black',
            fontWeight: 'bolder',
        }
    },
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-rail': {
            height: '8px',
        },
        '& .rc-slider-track': {
            backgroundColor: 'transparent',
        },   
        
        '& .rc-slider-handle,.rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover' : {
            backgroundColor: 'cadetblue',
            outline: 'none',
            border: '2px solid cadetblue',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginTop: '-3px',
        },

        '& .select-container':{
            marginLeft: 'auto',
            marginRight: '1rem',
        }
    },
    icon:{
        fontSize: '30px',
        marginRight: '10px',
    },
}