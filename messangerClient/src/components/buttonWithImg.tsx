


import "./buttonWithImg.scss"
function ButtonWithImg(props:ButtonWithImgProps) {
    
    return(
        <div className="buttonWithImg">
            <img src={props.img}></img>
            <span>{props.text}</span>
        </div>
    );
};
export default  ButtonWithImg;
interface ButtonWithImgProps{
    img:string;
    text:string;
   
    }
    