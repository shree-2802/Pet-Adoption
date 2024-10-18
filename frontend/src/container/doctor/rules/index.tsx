import React from 'react'
import styles from './index.module.scss';

const Instruction = () => {
  return (
    <div className={styles.instruction}>
      <h3>Instructions</h3>
      <div className={styles.instruction_set}>
        <p>Becoming a doctor is an enormous commitment because it takes years of
          dedicated studying and clinical preparation before
          you can practise as a doctor. As a doctor, you interact with patients,
          diagnose their problems and prescribe medicines to restore their physical
          and mental well-being. If you have a passion for becoming a doctor,
          understanding this job role can help you make an informed decision. In here
          article, we answer “What does a doctor do?”, explore their average salary,
          understand their workplace and work environment and learn the qualification
          and skills required to become a successful doctor.</p>
        <ul>
          <li>Listen to patients carefully to understand the disease symptoms.</li>
          <li>Perform a diagnosis to find the cause of illness.</li>
          <li>Prescribe medication and administer treatments based on the diagnosis.</li>
          <li>Perform general examination and order blood tests and procedures to understand a patient's ailment or illness.</li>
          <li>Provide follow-up treatments or refer patients to other doctors.</li>
        </ul>
      </div>
    </div>
  )
}

export default Instruction
