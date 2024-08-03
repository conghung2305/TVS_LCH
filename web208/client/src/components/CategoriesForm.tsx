import {
    Button,
    Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { CategoriesFormParams } from "src/types/Product";
import { InputText } from "./elements/InputText";

type ProductCategories = {
    onSubmit: (values: CategoriesFormParams) => void;
    initialValues?: any;
};

function ProductForm({ onSubmit, initialValues }: ProductCategories) {
    const validate = (values: CategoriesFormParams) => {
        const { name, description } = values;
        const errors: ValidationErrors = {};
        if (!name) errors.title = "Cần nhập tên danh mục";
        if (name && name.length < 6)
            errors.title = "Tên danh mục cần có tối thiểu 6 ký tự";
        if (!description) errors.price = "Cần nhập mô tả";
        return errors;
    };

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            render={({ values }) => {
                return (
                    <Stack spacing={2}>
                        <Field
                            name="name"
                            render={({ input, meta }) => (
                                <InputText
                                    input={input}
                                    label={"Tên Danh Mục"}
                                    messageError={meta.touched && meta.error}
                                />
                            )}
                        />
                        <Field<string>
                            name="description"
                            render={({ input, meta }) => (
                                <InputText
                                    input={input}
                                    label={"Mô Tả"}
                                    messageError={meta.touched && meta.error}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            onClick={() => onSubmit(values)}
                            sx={{
                                backgroundColor: '#1976d2', 
                                color: '#fff', 
                                margin: '20px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: '#1565c0', 
                                },
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Gửi
                        </Button>
                    </Stack>
                );
            }}
        />
    );
}

export default ProductForm;
