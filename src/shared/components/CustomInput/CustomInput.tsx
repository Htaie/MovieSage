import styles from './InputStyles.module.css';

interface CustomInputProps {
  type: string;
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ type, label, id, value, onChange, name }) => {
  const isInputEmpty = value === '';

  return (
    <div className={styles['input-container']}>
      <input type={type} id={id} className={styles['input-style']} value={value} onChange={onChange} name={name} />
      <label htmlFor={id} className={`${styles['label-style']} ${isInputEmpty ? '' : styles['label-up']}`}>
        {label}
      </label>
    </div>
  );
};
