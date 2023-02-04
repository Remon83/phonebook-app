import styles from "./button.module.css"

const Button = ({children, click, color}) => {
    const {button, primary} = styles
    return(
        <button onClick={click} className={`${button} ${color ? styles[color] : primary}`} >{children}</button>
    )
}

export default Button;