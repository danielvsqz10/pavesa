import React, { useState } from 'react';

const QuoteForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        }

        if (!formData.serviceType) {
            newErrors.serviceType = 'Seleccione un tipo de servicio';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es requerido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }

            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                serviceType: '',
                message: '',
            });

            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);

        } catch (error) {
            setSubmitError('Ocurrió un error al enviar el formulario. Por favor, intente nuevamente.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">¡Éxito!</strong>
                    <span className="block sm:inline"> Su solicitud de cotización ha sido enviada correctamente. Nos pondremos en contacto con usted a la brevedad.</span>
                </div>
            )}

            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {submitError}</span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>

                <div>
                    <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`w-full ${errors.serviceType ? 'border-red-500' : ''}`}
                    >
                        <option value="">Tipo de servicio</option>
                        <option value="concreto">Concreto</option>
                        <option value="asfalto">Asfalto</option>
                        <option value="terraceria">Terracería</option>
                        <option value="obra-gris">Obra Gris</option>
                    </select>
                    {errors.serviceType && <p className="text-red-500 text-xs">{errors.serviceType}</p>}
                </div>
            </div>

            <div>
                <textarea
                    name="message"
                    placeholder="Mensaje"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full ${errors.message ? 'border-red-500' : ''}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="btn-primary w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Enviando...' : 'ENVIAR'}
            </button>
        </form>
    );
};

export default QuoteForm;
