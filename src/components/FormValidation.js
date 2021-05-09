import React, {useEffect, useState} from 'react';

const FormValidation = ({config, submitFlag}) => {

    const [errors, setErrors] = useState([]);

    useEffect(() => {

        validateForm();

    }, [submitFlag])


    const validateForm = () => {

        let tempErrorsArray = [];

        for (let i = 0; i < config.length; i++) {
            const field = config[i].field
            const key = field.value;

            if (field.hasOwnProperty('minLength')) {
                if (key === '') {
                    tempErrorsArray.push({
                        message: field.name + ' is required.',
                        key: field.name + '-required'
                    });
                } else if (key.length < field.minLength) {
                    tempErrorsArray.push({
                        message: field.name + ' must be ' + field.minLength + ' characters long.',
                        key: field.name + '-minLength'
                    });
                }
            }


            //fix this
            if(field.hasOwnProperty('date')){
                let now = new Date();
                console.log("date", key);
                console.log("today", now);
                console.log("month", now.getMonth());
                console.log("day", now.getDay());
               // now.setHours(0,0,0,0)
               //  if(key < now){
               //      console.log('past');
               //  }
            }

            //todo: date validation future/past

        }

        setErrors(tempErrorsArray);
        console.log(errors);
    };


    return (
        <div>

            {errors.length > 0
                ?
                <div
                    className="ui error message"
                    style={{textAlign: "center", padding: "0.25rem 0.25rem", marginTop: "0.5rem"}}
                >
                    {errors.map((error) => (<p key={error.key}>{error.message}</p>))}
                </div>
                :
                null
            }


        </div>
    );

};

export default FormValidation;
