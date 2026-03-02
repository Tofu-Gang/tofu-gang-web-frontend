type InputFieldProps = {
    name: string;
    label: string;
    type: string;
}

function InputField({ name, label, type }: InputFieldProps) {
    const inputClasses = "w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100";

    return (
        <div>
            <label htmlFor={name} id={name} className="block text-sm font-medium text-gray-300">{label}</label>
            {type === "textarea" ?
                <textarea name={name} className={inputClasses} /> :
                <input type={type} name={name} className={inputClasses} />
            }
        </div>
    );
}

export default InputField;
