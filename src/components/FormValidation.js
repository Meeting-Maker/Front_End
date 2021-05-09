import React, {useEffect, useState} from 'react';

const FormValidation = ({config, submitFlag, setRenderErrors}) => {

    const [errors, setErrors] = useState([]);

    useEffect(() => {

        validateForm();

    }, [submitFlag])


    const validateForm = () => {
        let tempErrorsArray = [];

        for (let i = 0; i < config.length; i++) {
            const field = config[i].field
            const value = field.value;

            if (field.hasOwnProperty('minLength')) {
                if (value === '' || value === 'T') {
                    tempErrorsArray.push({
                        message: field.name + ' is required.',
                        key: field.name + '-required'
                    });
                } else if (value.length < field.minLength) {
                    tempErrorsArray.push({
                        message: field.name + ' must be at least ' + field.minLength + ' characters long.',
                        key: field.name + '-minLength'
                    });
                }
            }


            if (field.hasOwnProperty('requiredFuture')) {

                let now = new Date();
                now.setHours(now.getHours(), now.getMinutes(), 0, 0);

                const [date, time] = value.split('T');
                const [year, month, day] = date.split('-');
                const [hour, minute] = time.split(':');

                let selectedDate = new Date(parseInt(year), month - 1, parseInt(day), parseInt(hour),
                    parseInt(minute), 0, 0);

                if (selectedDate < now) {
                    tempErrorsArray.push({
                        message: field.name + ' has already passed.',
                        key: field.name + '-date'
                    })
                }
            }
        }

        setErrors(tempErrorsArray);

        if(tempErrorsArray.length === 0){
            setRenderErrors(false);
        }
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
