import React, {useState} from 'react';
import logo from './logo.svg';
import proteinCalc from "./protein";
import './App.css';

const App = () => {
    const [values, setValues] = useState({protein_1: '', protein_2: ''});
    const [result, setResult] = useState([]);

    const handleChange = (name, value) => {
        setValues({...values, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault() || console.log(values);
        //console.log(proteinCalc(values.protein_1, values.protein_2));
        setResult(proteinCalc(values.protein_1, values.protein_2));
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <main className='Content'>
                <p>
                    ВbI4ИÇЛЄНN€ ПР0ТÊИНÓВ<br/>
                    {result[0] ? 'ДИСТАНЦИЯ —> ' + result[0] : <br/>}
                </p>
                <ProteinForm onSubmit={handleSubmit} onChange={handleChange} values={values} result={result}/>
            </main>
            <Footer/>
        </div>
    );
};

let Footer = () => (
    <div className='Footer'>Made by <a href='https://github.com/shrmnn'>shrmnn</a></div>
);

let ProteinForm = ({onSubmit, onChange, values, result}) => (
    <form onSubmit={onSubmit}>
        <label>
            ПРОТЕИН 1:
            <br/><Input type="text" name="protein_1" value={values.protein_1} onChange={onChange}/>
            {result[1] ? <p className='Result'> —> {result[1]}</p> : null}
            <br/>
            <br/>ПРОТЕИН 2:
            <br/><Input type="text" name="protein_2" value={values.protein_2} onChange={onChange}/>
            {result[2] ? <p className='Result'> —> {result[2]}</p> : null}
        </label>
        <br/><input type="submit" name='submit' value='РАССЧИТАТЬ'/>
    </form>
);

let Input = ({type, name, onChange, value, ...rest}) => (
    <input
        name={name}
        type={type}
        value={value}
        onChange={event => {
            event.preventDefault();
            onChange(name, event.target.value);
        }}
        {...rest}
    />
);

export default App;
