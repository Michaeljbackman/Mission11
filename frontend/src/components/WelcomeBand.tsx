interface WelcomeBandProps {
    text: string;
  }
  
  function WelcomeBand({ text }: WelcomeBandProps) {
    return (
      <div className="row bg-primary text-white text-center py-3 mb-4">
        <h1 className="m-0">{text}</h1>
      </div>
    );
  }
  
  export default WelcomeBand;
  