import styles from './InputStyles.module.css';

interface CustomInputProps {
  type: string;
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({ type, label, id, value, onChange }) => {
  return (
    <div className={styles['input-container']}>
      <input type={type} id={id} className={styles['input-style']} value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
