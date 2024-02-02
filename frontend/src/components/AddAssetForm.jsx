import { useRef, useState } from 'react'
import {
    Divider,
    Select,
    Space,
    Form,
    Button,
    InputNumber,
    DatePicker,
    Result,
} from 'antd'
import { useCrypto } from '../context/ContextWrapper'
import CoinInfo from './CoinInfo'

const AddAssetForm = () => {
    const [form] = Form.useForm()
    const { crypto, addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    const validateMessages = {
        required: '${label} is required',
        types: {
            number: '${label} is not valid number',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder={'Select coin'}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: '1.5rem' }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(1),
        })
    }

    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(1),
        })
    }

    const handleResultClose = () => {
        setSubmitted(false)
        setCoin(null)
        form.resetFields()
    }
    if (submitted) {
        return (
            <Result
                status="success"
                title="New asset added!"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
                extra={[
                    <Button
                        type="primary"
                        key="result"
                        onClick={handleResultClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }

    return (
        <>
            <CoinInfo coin={coin} />
            <Divider />
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: '100%',
                }}
                wrapperCol={{
                    span: '100%',
                }}
                initialValues={{
                    price: +coin.price.toFixed(3),
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}>
                <div className="inputes">
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0.1,
                                max: 9999,
                            },
                        ]}>
                        <InputNumber
                            placeholder="Enter coin amout"
                            onChange={handleAmountChange}
                        />
                    </Form.Item>

                    <Form.Item label="Price" name="price">
                        <InputNumber onChange={handlePriceChange} />
                    </Form.Item>

                    <Form.Item label="Date & Time" name="date">
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="Total" name="total">
                        <InputNumber disabled />
                    </Form.Item>
                </div>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit">
                        Add asset
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddAssetForm
