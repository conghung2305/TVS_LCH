import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { ProductFormParams } from "src/types/Product";
import { InputText } from "./elements/InputText";

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: any;
  categories: { value: string; label: string }[]; 
};

function ProductForm({ onSubmit, initialValues, categories }: ProductFormProps) {
  const validate = (values: ProductFormParams) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Cần nhập tên sản phẩm";
    if (title && title.length < 6)
      errors.title = "Cần nhập tối thiểu 6 kí tự";
    if (!image) errors.image = "Cần nhập ảnh vào";
    if (!category) errors.category = "Cần chọn danh mục";
    if (!price || price <= 0) errors.price = "Giá sản phẩm phải lớn hơn 0";
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ values }) => (
        <Stack>
          <Field
            name="title"
            render={({ input, meta }) => (
              <InputText
                input={input}
                label={"Tiêu đề"}
                messageError={meta.touched && meta.error}
              />
            )}
          />
          <Field
            name="image"
            render={({ input, meta }) => (
              <InputText
                input={input}
                label={"Hình ảnh"}
                messageError={meta.touched && meta.error}
              />
            )}
          />
          <Field<string>
            name="description"
            render={({ input, meta }) => (
              <InputText
                input={input}
                label={"Mô tả"}
                messageError={meta.touched && meta.error}
              />
            )}
          />
          <Field<number>
            name="price"
            render={({ input, meta }) => (
              <InputText
                input={input}
                label={"Giá"}
                messageError={meta.touched && meta.error}
                type="number"
              />
            )}
          />
          <Field<boolean>
            name="isShow"
            type="checkbox"
            render={({ input }) => (
              <FormControlLabel
                control={<Checkbox {...input} />}
                label="Hiển thị sản phẩm"
              />
            )}
          />
          <Field<string>
            name="category"
            render={({ input, meta }) => (
              <FormControl fullWidth error={meta.touched && !!meta.error}>
                <InputLabel>Danh mục</InputLabel>
                <Select {...input} label="Danh mục">
                  <MenuItem value="">Chọn</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                {meta.touched && meta.error && (
                  <FormHelperText>{meta.error}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Button
            type="submit"
            onClick={() => onSubmit(values)}
            sx={{
              backgroundColor: '#007bff', 
              color: '#fff',             
              margin: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#0056b3', 
              },
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            Gửi
          </Button>

        </Stack>
      )}
    />
  );
}

export default ProductForm;
