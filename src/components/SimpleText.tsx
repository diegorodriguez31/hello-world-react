import styles from "./styles";

export interface SimpleTextProps {
    text?: string | null;
}

const SimpleText = (props: SimpleTextProps) => {
    const {text, ...other} = props;
    const classes = styles();
    const isLoading = text === undefined;

    return isLoading ?  <p data-testid={"loading_placeholed"}>Loading...</p>
                     :  <p {...other} /*className={classes.text}*/>
                            {text !== null ? text : "-"}
                        </p>
}

export default SimpleText;