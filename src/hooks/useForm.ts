import {useCallback, useEffect, useState} from 'react';

interface useFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

const useForm = <T extends object>({
  initialValue,
  validate,
}: useFormProps<T>) => {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeValue = useCallback(
    (name: keyof T, value: string | number | Date) => {
      setValues(prev => ({...prev, [name]: value}));
    },
    [],
  );

  const getTextInputProps = useCallback(
    (name: keyof T) => {
      const value = values[name] as string;
      const onChangeText = (newValue: string) =>
        handleChangeValue(name, newValue);
      const onBlur = () => setTouched(prev => ({...prev, [name]: true}));

      return {value, onChangeText, onBlur};
    },
    [handleChangeValue, values],
  );

  const setAllTouched = useCallback(() => {
    const newTouched: Record<string, boolean> = {};
    Object.keys(values).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);
  }, [values]);

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
  }, [validate, values]);

  return {
    values,
    touched,
    errors,
    onChange: handleChangeValue,
    getTextInputProps,
    setAllTouched,
  };
};

export default useForm;
