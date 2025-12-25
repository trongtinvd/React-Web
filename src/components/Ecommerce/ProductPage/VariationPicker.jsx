import { useState } from 'react';
import './VariationPicker.css';

function VariationPicker({ className = '', setPrice, variations, variationNames, selectedValues, setSelectedValues }) {

    const valuesOfVariations = [];
    for (let i = 0; i < variationNames.length; i++) {
        valuesOfVariations[i] = [];
        for (let j = 0; j < variations.length; j++) {
            if (!valuesOfVariations[i].includes(variations[j].values[i])) {
                valuesOfVariations[i].push(variations[j].values[i]);
            }
        }
    }

    for (let i = 0; i < variations.length; i++) {
        if (JSON.stringify(selectedValues) === JSON.stringify(variations[i].values)) {
            setPrice(variations[i].price);
            break;
        }

    }

    function selectingHandle(index, value) {
        setSelectedValues(prev => {
            const next = [...prev]
            next[index] = value;
            return next;
        });
    }

    return (
        <div>
            {
                variationNames.map((name, index) => (
                    <>
                        <h3 key={index}>{name}</h3>
                        {valuesOfVariations[index].map(value => (
                            <button key={value} className={selectedValues[index] === value ? 'VariationPicker_selected' : ''} onClick={() => selectingHandle(index, value)}>{value}</button>
                        ))}
                    </>
                ))
            }
        </div>
    )
}

export default VariationPicker;