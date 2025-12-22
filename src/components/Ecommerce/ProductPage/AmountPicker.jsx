import './AmountPicker.css'

function AmountPicker({ className = '', amount, setAmount }) {
    function changeAmountHandle(value) {
        return () => setAmount(prev => Math.max(1, prev + value));
    }

    return (
        <div className={`${className}`}>
            <div className='AmountPicker'>
                <button className="AmountPicker__button" onClick={changeAmountHandle(-1)}>-</button>
                <input className="AmountPicker__input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} name='amount' id='amount' />
                <button className="AmountPicker__button" onClick={changeAmountHandle(1)}>+</button>
            </div>
        </div>
    )
}

export default AmountPicker;