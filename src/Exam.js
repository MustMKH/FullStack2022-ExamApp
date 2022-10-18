import Question from "./Question";

const Exam = (props) => {
  console.log("tulostetaan props.exam", props.exam)
  return (
    <div>
      <nav ClassName ="exams">
        <ul className="exam-items">
{/* LAITA TÄHÄN TENTTIEN NIMET: */}
          <li>{props.exam.identifier}</li>
          <li>{props.exam.identifier}</li>
          <li>{props.exam.identifier}</li>
        </ul>
      </nav>
      <h1 className="main-title">
          {props.exam.identifier}
      </h1>
{/* TEE BODY JA LAITA MARGINAALI */}
      <input type="text" onChange={(event) => { props.examRenamed(event.target.value) }} value = {props.exam.name}/>
{/*       <ul>ToDo:<small>
          <li>NUMEROI KYSYMYKSET</li>
          <li>TEE CHECKBOXIT</li>
          <li>TYHJENNÄ KAIKKI CAPSILLA OLEVAT KENTÄT (MYÖS KYSYMYSLISTASTA)</li>
      </small></ul> */}
      <h2 className="sub-title">Ohje:</h2>
      <ol className="main-help">
          <li>Lue kysymykset läpi huolellisesti.</li>
          <li>Vastaa kysymykseen valitsemalla oikea vastaus.</li>
          <li>Tarkista vastauksesi ja paina "Lähetä".</li>
      </ol>
      <div>KYSYMYKSET:</div>
      <div>{props.exam.questions.map((question,index) => <Question answerChanged = {props.answerChanged} questionIndex = {index} question={question} />)}</div>
      </div>
  );
}

export default Exam;
