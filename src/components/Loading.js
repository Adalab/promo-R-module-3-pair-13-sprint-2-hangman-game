import "../styles/Loading.scss";

function Loading (props) {
    return(
        <span className={props.isLoading ? props.loading : '' } />
    )
}
export default Loading;