import code from '../assets/code.png';

function Demo(props) {
  return (
    <div className="Demo">
      <img src={code} />
      <button onClick={props.exit}>X</button>
    </div>
  )
}

export default Demo;
