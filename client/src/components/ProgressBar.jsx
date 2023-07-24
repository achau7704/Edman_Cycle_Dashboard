import React from 'react'
  
const ProgressBar = ({bgcolor,progress,height}) => {
     
    // const [progress, setProgress] = useState(0);

    // useEffect(() => {
    // const interval = setInterval(() => {
    //   // Update progress value
    //   setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 1));
    // }, 1000); // Update every second

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 50
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:40,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}
  
export default ProgressBar;