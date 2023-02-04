import styles from "./container.module.css"

const Container = ({children, ...rest}) => {
    const {container} = styles
    return (
        <div className={container} {...rest}>{children}</div>
    )
}

export default Container;