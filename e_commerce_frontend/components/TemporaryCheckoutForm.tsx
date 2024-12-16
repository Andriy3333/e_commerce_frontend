import React, { useState } from 'react';

// Validation logic
const validatePresence = (value: string) => value.trim().length > 0;
const validatePostalCode = (postalCode: string) => /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode);
const validatePhone = (phone: string) => /^\d{3}-\d{3}-\d{4}$/.test(phone);
const validateCardNumber = (cardNumber: string) => /^\d{4}(\s?\d{4}){3}$/.test(cardNumber);
const validateExpirationDate = (expirationDate: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate);
const validateCVV = (cvv: string) => /^\d{3}$/.test(cvv);

const TemporaryCheckoutForm = () => {
  const [formData, setFormData] = useState({
    country: '',
    province: '',
    street: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({
    country: '',
    province: '',
    street: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Perform validation
    switch (id) {
      case 'country':
        setErrors((prev) => ({
          ...prev,
          country: validatePresence(value) ? '' : 'Country is required',
        }));
        break;
      case 'province':
        setErrors((prev) => ({
          ...prev,
          province: validatePresence(value) ? '' : 'Province is required',
        }));
        break;
      case 'street':
        setErrors((prev) => ({
          ...prev,
          street: validatePresence(value) ? '' : 'Street is required',
        }));
        break;
      case 'postalCode':
        setErrors((prev) => ({
          ...prev,
          postalCode: validatePostalCode(value) ? '' : 'Invalid postal code',
        }));
        break;
      case 'phone':
        setErrors((prev) => ({
          ...prev,
          phone: validatePhone(value) ? '' : 'Invalid phone number',
        }));
        break;
      case 'cardNumber':
        setErrors((prev) => ({
          ...prev,
          cardNumber: validateCardNumber(value) ? '' : 'Invalid card number',
        }));
        break;
      case 'expirationDate':
        setErrors((prev) => ({
          ...prev,
          expirationDate: validateExpirationDate(value) ? '' : 'Invalid expiration date',
        }));
        break;
      case 'cvv':
        setErrors((prev) => ({
          ...prev,
          cvv: validateCVV(value) ? '' : 'Invalid CVV',
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
        {/* Country */}
        <div>
          <label htmlFor='country' className='block text-sm font-medium'>
            Country
          </label>
          <input
            id='country'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.country ? 'border-red-500' : ''}`}
            placeholder='e.g., Canada'
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <p className='text-red-500 text-sm'>{errors.country}</p>}
        </div>

        {/* Province */}
        <div>
          <label htmlFor='province' className='block text-sm font-medium'>
            Province
          </label>
          <input
            id='province'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.province ? 'border-red-500' : ''}`}
            placeholder='e.g., Ontario'
            value={formData.province}
            onChange={handleChange}
          />
          {errors.province && <p className='text-red-500 text-sm'>{errors.province}</p>}
        </div>

        {/* Street */}
        <div>
          <label htmlFor='street' className='block text-sm font-medium'>
            Street
          </label>
          <input
            id='street'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.street ? 'border-red-500' : ''}`}
            placeholder='e.g., 123 Main St'
            value={formData.street}
            onChange={handleChange}
          />
          {errors.street && <p className='text-red-500 text-sm'>{errors.street}</p>}
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor='postalCode' className='block text-sm font-medium'>
            Postal Code
          </label>
          <input
            id='postalCode'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.postalCode ? 'border-red-500' : ''}`}
            placeholder='e.g., A1A 1A1'
            value={formData.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && <p className='text-red-500 text-sm'>{errors.postalCode}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor='phone' className='block text-sm font-medium'>
            Phone
          </label>
          <input
            id='phone'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.phone ? 'border-red-500' : ''}`}
            placeholder='e.g., 123-456-7477'
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
        </div>

        {/* Card Number */}
        <div>
          <label htmlFor='cardNumber' className='block text-sm font-medium'>
            Card Number
          </label>
          <input
            id='cardNumber'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.cardNumber ? 'border-red-500' : ''}`}
            placeholder='e.g., 1234 1234 1234 1234'
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className='text-red-500 text-sm'>{errors.cardNumber}</p>}
        </div>

        {/* Expiration Date */}
        <div>
          <label htmlFor='expirationDate' className='block text-sm font-medium'>
            Expiration Date
          </label>
          <input
            id='expirationDate'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.expirationDate ? 'border-red-500' : ''}`}
            placeholder='MM/YY'
            value={formData.expirationDate}
            onChange={handleChange}
          />
          {errors.expirationDate && <p className='text-red-500 text-sm'>{errors.expirationDate}</p>}
        </div>

        {/* CVV */}
        <div>
          <label htmlFor='cvv' className='block text-sm font-medium'>
            CVV
          </label>
          <input
            id='cvv'
            type='text'
            className={`w-full border rounded-md p-2 mt-1 ${errors.cvv ? 'border-red-500' : ''}`}
            placeholder='e.g., 123'
            value={formData.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <p className='text-red-500 text-sm'>{errors.cvv}</p>}
        </div>
      </form>
    </div>
  );
};

export default TemporaryCheckoutForm;
