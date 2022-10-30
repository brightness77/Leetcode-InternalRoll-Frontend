import InternalRoll from "../components/InternalRoll";


const styles = {
    juanContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        ml: '50%',
        mr: '50%',
    },

    backgroundColor: {
        backgroundColor: '#303030',
        width: '2560',
        height: '1600',
    }
}

function RunView(): React.ReactElement {

    

    return (
        <>
        <p style = {styles.backgroundColor}>
            <p style = {styles.juanContainer}>
                <InternalRoll />
            </p>
        </p>
        </>
    )
}

export default RunView;