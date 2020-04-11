import * as R from 'ramda';
import Api from '../tools/api'; 

const api = new Api();

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {

    const validation = (val) => {
        if (
            R.allPass([
                R.compose(
                    R.gt(R.__, 2),
                    R.length
                ),
                R.compose(
                    R.lt(R.__, 10),
                    R.length
                ),
                R.compose(
                    R.gt(R.__, 0),
                    R.length,
                    R.match(/^[0-9]*\.?[0-9]*$/g, R.__)
                ),
            ])(val)
        ) {
            return val;
        } else handleError();
    }

    const writeLogwithReturningValue = (val) => {
        writeLog(val);
        return val;
    }

    const secondStep = (value) => {
        try {
            (async() => {
                const { result } = await R.compose(
                    (id) => api.get(`https://animals.tech/${id}`)(id),
                    writeLogwithReturningValue,
                    (val) => val % 3,
                    writeLogwithReturningValue,
                    (val) => val ** 2,
                    writeLogwithReturningValue,
                    R.length,
                    writeLogwithReturningValue
                )(value);

                handleSuccess(result);
            })();
        } catch(e) {
            handleError(e);
        }
    }

    try {
        (async () => {
            const { result } = await R.compose(
                (val) => api.get('https://api.tech/numbers/base', {from: 10, to: 2, number: val}),
                writeLogwithReturningValue,
                (val) => Math.round(val),
                validation,
                writeLogwithReturningValue,
            )(value);

            secondStep(result);
        })();
    } catch(e) {
        handleError(e);
    }
}

export default processSequence;
