import Container from "../container/Container"
import styles from "./LightBox.module.css"

const LightBox = ({children, closeHandle}) => {
    return (
        <>
            <div className={styles.lightbox} onClick={closeHandle}></div>
            <Container style={{backgroundColor: "white", width: "500px", zIndex: 10, position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)"}}>
                {children}
            </Container>
        </>
        
    )
}

export default LightBox