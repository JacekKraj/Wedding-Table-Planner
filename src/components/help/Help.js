import React, {Fragment} from "react";

import classes from "./help.module.scss";
import Question from "./question/Question";
import LogoBar from './../logoBar/LogoBar'

const Faq = (props) => {
  return (
    <Fragment>
    <LogoBar />
    <div className={classes.container}>
      <h1 className={classes.title}>The most common questions</h1>
      <Question question="Is page free to use?" answer="All page features are completly free to use, and it won't change in the future." />
      <Question
        question="Do I need to create and account?"
        answer="Yes, you need to create an account in order to be able to save data you sent to page."
      />
      <Question
        question="Is amount of projects that I can create limited?"
        answer="No, there is no project's amount limit. You can create as much data as you need."
      />
      <Question
        question="Can I print my project?"
        answer="Yes you can. There is a print button in project section."
      />
      
      <p className={classes.footer}>For more answer contact us in contact section.</p>
    </div>
    </Fragment>
  );
};

export default Faq;
