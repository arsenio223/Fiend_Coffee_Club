// app/checkout/page.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import { saveOrder } from '@/utils/firebase/orders';
import { 
  ArrowLeft, 
  Trash2, 
  Minus, 
  Plus, 
  Truck, 
  Store, 
  Shield, 
  CreditCard,
  CheckCircle,
  Copy,
  Upload,
  X
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, removeFromCart, updateQuantity, totalItems, total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup'>('ship');
  const [paymentMethod, setPaymentMethod] = useState<'paymongo' | 'cod'>('paymongo');
  const [step, setStep] = useState<'checkout' | 'payment' | 'success'>('checkout');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderError, setOrderError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subscribeNewsletter: false,
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    barangay: '',
    postalCode: '',
    city: '',
    region: 'Davao del Sur',
    country: 'Philippines',
    deliveryNotes: '',
    selectedBranch: '',
  });

  const qrCodeImage = '/images/gcash-qr.jpg';
  const gcashNumber = '09123456789';
  const accountName = 'FIEND Coffee Club';

  const getBranchDetails = useCallback((branch: string) => {
    const branches = {
      obrero: {
        name: 'Obrero Branch',
        address: 'Loyola St, Poblacion District, Davao City, 8000 Davao del Sur'
      },
      juna: {
        name: 'Juna Branch',
        address: 'Juna Ave, Matina, Davao City, 8000 Davao del Sur'
      }
    };
    return branches[branch as keyof typeof branches] || null;
  }, []);

  const totalWithDelivery = useMemo(() => {
    try {
      const deliveryFee = deliveryMethod === 'pickup' ? 0 : 50;
      return total + deliveryFee;
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  }, [total, deliveryMethod]);

  const handleQuantityChange = useCallback((productId: string, newQuantity: number) => {
    try {
      if (!productId) {
        console.error('Invalid product ID');
        return;
      }
      if (newQuantity < 1) {
        console.warn('Quantity must be at least 1');
        return;
      }
      updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((productId: string) => {
    try {
      if (!productId) {
        console.error('Invalid product ID');
        return;
      }
      removeFromCart(productId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }, [removeFromCart]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    try {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));

      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error handling input change:', error);
    }
  }, [errors]);

  const handleBranchSelect = useCallback((branch: string) => {
    try {
      setFormData(prev => ({ ...prev, selectedBranch: branch }));
      if (errors.branch) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.branch;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error selecting branch:', error);
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    try {
      const newErrors: { [key: string]: string } = {};
      
      if (!formData.email && !formData.phone) {
        newErrors.contact = 'Please provide email or phone number';
      }
      
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.barangay) newErrors.barangay = 'Barangay is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
      if (!formData.city) newErrors.city = 'City is required';
      
      if (deliveryMethod === 'pickup' && !formData.selectedBranch) {
        newErrors.branch = 'Please select a pickup location';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      console.error('Error validating form:', error);
      return false;
    }
  }, [formData, deliveryMethod]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          return;
        }
        
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          alert('Please upload a PNG, JPG, or JPEG file');
          return;
        }
        
        setProofFile(file);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const result = event.target?.result as string;
            if (result) {
              setProofPreview(result);
              console.log('Preview set successfully');
            }
          } catch (error) {
            console.error('Error setting preview:', error);
          }
        };
        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          alert('Error reading file. Please try again.');
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error handling file:', error);
      alert('Error uploading file. Please try again.');
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    try {
      setProofFile(null);
      setProofPreview(null);
    } catch (error) {
      console.error('Error removing file:', error);
    }
  }, []);

  const handlePayNow = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);
    
    try {
      if (!validateForm()) {
        const firstError = document.querySelector('.error-message');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      if (items.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
      }
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        try {
          setIsSubmitting(false);
          setStep('payment');
        } catch (error) {
          console.error('Error transitioning to payment step:', error);
          setIsSubmitting(false);
        }
      }, 1500);
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsSubmitting(false);
      alert('An error occurred. Please try again.');
    }
  }, [validateForm, items.length]);

  const handleSubmitPayment = useCallback(async () => {
    try {
      console.log('=== STARTING PAYMENT SUBMISSION ===');
      
      if (!proofFile) {
        alert('Please upload your proof of payment.');
        return;
      }
      
      setIsSubmitting(true);
      setOrderError(null);
      
      // Prepare order data
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        customerEmail: formData.email || 'No email provided',
        customerPhone: formData.phone || 'No phone provided',
        customerAddress: `${formData.address}, ${formData.barangay}, ${formData.city}`.trim(),
        items: items.map(item => ({
          productId: item.productId,
          name: item.product?.name || 'Unknown',
          price: item.product?.price || 0,
          quantity: item.quantity,
          subtotal: (item.product?.price || 0) * item.quantity
        })),
        subtotal: total,
        deliveryFee: deliveryMethod === 'pickup' ? 0 : 50,
        total: totalWithDelivery,
        deliveryMethod: deliveryMethod,
        pickupBranch: deliveryMethod === 'pickup' ? formData.selectedBranch : null,
        paymentMethod: paymentMethod === 'paymongo' ? 'gcash' : 'cod',
      };
      
      console.log('Order data:', JSON.stringify(orderData, null, 2));
      
      // Save order to Firebase
      const result = await saveOrder(orderData);
      console.log('Save result:', result);
      
      if (result.success) {
        clearCart();
        setStep('success');
      } else {
        setOrderError(result.error || 'Failed to save order');
        alert('Failed to save order: ' + result.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setOrderError(error instanceof Error ? error.message : 'Unknown error');
      setIsSubmitting(false);
      alert('An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [proofFile, formData, items, total, totalWithDelivery, deliveryMethod, paymentMethod, clearCart]);

  const handleBackToCheckout = useCallback(() => {
    try {
      setStep('checkout');
    } catch (error) {
      console.error('Error navigating back:', error);
    }
  }, []);

  const handleCopyNumber = useCallback(() => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(gcashNumber);
        alert('GCash number copied!');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = gcashNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('GCash number copied!');
      }
    } catch (error) {
      console.error('Error copying number:', error);
      alert('Unable to copy. Please copy manually: ' + gcashNumber);
    }
  }, []);

  const formatPrice = useCallback((price: number | undefined) => {
    try {
      if (price === undefined || price === null || isNaN(price)) return '₱0';
      return `₱${price.toLocaleString()}`;
    } catch (error) {
      console.error('Error formatting price:', error);
      return '₱0';
    }
  }, []);

  const getItemPrice = useCallback((item: any) => {
    try {
      if (!item || !item.product) return 0;
      const price = item.product.price || 0;
      const quantity = item.quantity || 0;
      return price * quantity;
    } catch (error) {
      console.error('Error getting item price:', error);
      return 0;
    }
  }, []);

  const getItemName = useCallback((item: any) => {
    try {
      if (!item || !item.product) return 'Unknown Item';
      return item.product.name || 'Unknown Item';
    } catch (error) {
      console.error('Error getting item name:', error);
      return 'Unknown Item';
    }
  }, []);

  // If cart is empty
  if (items.length === 0 && step === 'checkout') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-maroon">
        <div className="text-center bg-white p-12 rounded-2xl shadow-soft max-w-md">
          <h2 className="text-3xl font-serif text-maroon mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything yet.</p>
          <Link href="/menu">
            <button className="bg-maroon text-white px-8 py-3 rounded-full font-semibold hover:bg-maroon-dark transition hover:scale-105">
              Browse Menu
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Success Step
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center py-10 bg-maroon">
        <div className="bg-white rounded-2xl shadow-soft p-12 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-serif text-maroon mb-2">Order Successful! 🎉</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your order! We've received your payment and will process your order shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-500">Order #: <span className="font-medium text-maroon">FD-{Date.now().toString().slice(-6)}</span></p>
            <p className="text-sm text-gray-500">We'll send a confirmation to your email.</p>
            {deliveryMethod === 'pickup' && formData.selectedBranch && (
              <p className="text-sm text-gray-500 mt-1">
                Pickup at: <span className="font-medium text-maroon">{getBranchDetails(formData.selectedBranch)?.name}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/menu">
              <button className="bg-maroon text-white px-8 py-3 rounded-full font-semibold hover:bg-maroon-dark transition hover:scale-105 w-full">
                Continue Shopping
              </button>
            </Link>
            <Link href="/">
              <button className="border-2 border-gray-300 text-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition w-full">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  if (step === 'payment') {
    return (
      <div className="min-h-screen py-8 bg-maroon">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBackToCheckout}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Checkout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Details */}
            <div className="bg-white rounded-2xl shadow-soft p-5">
              <h2 className="text-xl font-serif font-bold text-maroon mb-4">Complete Your Payment</h2>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="font-medium text-gray-700 mb-2 text-sm">Order Summary</p>
                
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div key={item.productId || Math.random().toString()} className="flex justify-between text-sm border-b border-gray-200 pb-2">
                        <span className="text-gray-700 text-base">
                          {getItemName(item)} <span className="text-gray-400">x{item.quantity || 0}</span>
                        </span>
                        <span className="font-medium text-gray-800">{formatPrice(getItemPrice(item))}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No items in cart</p>
                  )}
                </div>

                {deliveryMethod === 'pickup' && formData.selectedBranch && (
                  <div className="bg-maroon/5 rounded-lg p-2 mb-2 border border-maroon/20">
                    <div className="flex items-start gap-2">
                      <Store className="h-3 w-3 text-maroon mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-maroon">Pickup at:</p>
                        <p className="text-xs text-gray-600">
                          {getBranchDetails(formData.selectedBranch)?.name} - {getBranchDetails(formData.selectedBranch)?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-1 text-sm pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems || 0} items)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryMethod === 'pickup' ? '₱0' : '₱50'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-maroon text-base pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(totalWithDelivery)}</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-maroon/20 rounded-xl p-4 mb-4">
                <h3 className="font-serif font-bold text-maroon text-base mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  GCash Payment
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Account Name</p>
                      <p className="font-medium text-sm">{accountName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">GCash Number</p>
                      <p className="font-medium text-base">{gcashNumber}</p>
                    </div>
                    <button 
                      onClick={handleCopyNumber}
                      className="p-1.5 text-maroon hover:bg-maroon/10 rounded-full transition"
                      aria-label="Copy GCash number"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-800">
                    <p>⚠️ Please send the exact amount: <strong>{formatPrice(totalWithDelivery)}</strong></p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Scan to Pay with GCash</p>
                <div className="bg-white rounded-xl p-3 inline-block">
                  {qrCodeImage ? (
                    <Image 
                      src={qrCodeImage} 
                      alt="GCash QR Code"
                      width={160}
                      height={160}
                      className="mx-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-40 h-40 bg-maroon/5 rounded-xl flex items-center justify-center text-3xl';
                          fallback.textContent = '📱';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-40 h-40 bg-maroon/5 rounded-xl flex items-center justify-center text-3xl">
                      📱
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Scan the QR code using your GCash app</p>
              </div>
            </div>

            {/* Proof of Payment Upload */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-serif font-bold text-maroon mb-4">Upload Proof of Payment</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  After sending payment, please upload a screenshot or photo of your transaction for verification.
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-maroon/50 transition relative">
                  {proofPreview ? (
                    <div className="relative inline-block w-full">
                      <img 
                        src={proofPreview} 
                        alt="Proof of Payment" 
                        className="max-h-64 w-auto mx-auto rounded-lg object-contain border border-gray-200"
                        onError={(e) => {
                          console.error('Image failed to load');
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <button
                        onClick={handleRemoveFile}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {proofFile && (
                        <p className="text-sm text-gray-500 mt-2">{proofFile.name}</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm font-medium">Click or drag to upload</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Upload proof of payment"
                  />
                </div>

                {proofFile && !proofPreview && (
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {proofFile.name} (uploaded)
                  </p>
                )}

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-700 text-sm mb-1">Instructions:</h4>
                  <ol className="text-sm text-gray-600 space-y-0.5 list-decimal list-inside">
                    <li>Open your GCash app</li>
                    <li>Send the exact amount to the number above</li>
                    <li>Take a screenshot of the transaction</li>
                    <li>Upload the screenshot above</li>
                    <li>Click "Submit Payment" below</li>
                  </ol>
                </div>

                {/* Error Message Display */}
                {orderError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm">⚠️ {orderError}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmitPayment}
                  disabled={isSubmitting || !proofFile}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 text-base ${
                    !proofFile
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-maroon text-white hover:bg-maroon-dark hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Verifying...' : 'Submit Payment'}
                </button>

                {!proofFile && (
                  <p className="text-sm text-amber-600 text-center">
                    ⚠️ Please upload your proof of payment to submit
                  </p>
                )}

                <p className="text-xs text-gray-400 text-center">
                  Your payment will be verified within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Step - Full Maroon Background
  return (
    <div className="min-h-screen bg-maroon">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/menu" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
          <span className="text-white/40">|</span>
          <span className="text-white/60">Checkout</span>
        </div>

        <h1 className="text-4xl font-serif text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-2xl font-serif font-bold text-maroon mb-4">Contact</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">
                    Email or mobile phone number
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.contact ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Email or phone number"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.contact}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-maroon"
                  />
                  <label className="text-base text-gray-600">
                    Email me with news and offers
                  </label>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-2xl font-serif font-bold text-maroon mb-4">Delivery</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('ship')}
                  className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${
                    deliveryMethod === 'ship'
                      ? 'border-maroon bg-maroon/5 text-maroon'
                      : 'border-gray-200 hover:border-maroon/30'
                  }`}
                >
                  <Truck className={`h-5 w-5 ${deliveryMethod === 'ship' ? 'text-maroon' : 'text-gray-400'}`} />
                  <span className="font-medium">Ship</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-maroon bg-maroon/5 text-maroon'
                      : 'border-gray-200 hover:border-maroon/30'
                  }`}
                >
                  <Store className={`h-5 w-5 ${deliveryMethod === 'pickup' ? 'text-maroon' : 'text-gray-400'}`} />
                  <span className="font-medium">Pickup</span>
                </button>
              </div>

              {deliveryMethod === 'pickup' && (
                <div className="space-y-3 mt-3">
                  <p className="text-sm font-medium text-maroon">Choose your pickup location:</p>
                  
                  <div 
                    className={`bg-gray-50 rounded-xl p-4 border-2 transition-all cursor-pointer ${
                      formData.selectedBranch === 'obrero'
                        ? 'border-maroon bg-maroon/5'
                        : 'border-gray-200 hover:border-maroon/50'
                    }`}
                    onClick={() => handleBranchSelect('obrero')}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full mt-0.5 ${formData.selectedBranch === 'obrero' ? 'bg-maroon' : 'bg-maroon/10'}`}>
                        <Store className={`h-4 w-4 ${formData.selectedBranch === 'obrero' ? 'text-white' : 'text-maroon'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-maroon">Obrero Branch</p>
                          {formData.selectedBranch === 'obrero' && (
                            <span className="text-xs bg-maroon text-white px-2 py-0.5 rounded-full">Selected</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Loyola St, Poblacion District,<br />
                          Davao City, 8000 Davao del Sur
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-green-600">✓ Available for pickup</span>
                          <span className="text-xs text-gray-400">|</span>
                          <span className="text-xs text-gray-500">Open until 3:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`bg-gray-50 rounded-xl p-4 border-2 transition-all cursor-pointer ${
                      formData.selectedBranch === 'juna'
                        ? 'border-maroon bg-maroon/5'
                        : 'border-gray-200 hover:border-maroon/50'
                    }`}
                    onClick={() => handleBranchSelect('juna')}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full mt-0.5 ${formData.selectedBranch === 'juna' ? 'bg-maroon' : 'bg-maroon/10'}`}>
                        <Store className={`h-4 w-4 ${formData.selectedBranch === 'juna' ? 'text-white' : 'text-maroon'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-maroon">Juna Branch</p>
                          {formData.selectedBranch === 'juna' && (
                            <span className="text-xs bg-maroon text-white px-2 py-0.5 rounded-full">Selected</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Juna Ave, Matina,<br />
                          Davao City, 8000 Davao del Sur
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-green-600">✓ Available for pickup</span>
                          <span className="text-xs text-gray-400">|</span>
                          <span className="text-xs text-gray-500">Open until 3:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {errors.branch && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.branch}</p>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span>📍</span>
                    <span>Pickup is free of charge. Please wait for confirmation before picking up your order.</span>
                  </p>
                </div>
              )}

              {deliveryMethod === 'ship' && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">
                    There are 2 locations with your item
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-medium text-maroon">FIEND Coffee Club</p>
                    <p className="text-sm text-gray-600">
                      Juna Subdivision, Davao City, Philippines
                    </p>
                    <p className="text-sm text-green-600 mt-1">✓ Usually ready in 15-30 minutes</p>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-2xl font-serif font-bold text-maroon mb-4">Billing Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Country/Region</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon"
                  >
                    <option value="Philippines">Philippines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.firstName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.lastName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Company (optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Barangay</label>
                  <input
                    type="text"
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.barangay ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.barangay && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.barangay}</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Postal code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.postalCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon ${
                      errors.city ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 error-message">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Region</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon"
                  >
                    <option value="Davao del Sur">Davao del Sur</option>
                    <option value="Davao del Norte">Davao del Norte</option>
                    <option value="Davao Oriental">Davao Oriental</option>
                    <option value="Davao Occidental">Davao Occidental</option>
                    <option value="Davao de Oro">Davao de Oro</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-base font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-2xl font-serif font-bold text-maroon mb-4">Payment</h2>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                All transactions are secure and encrypted.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paymongo')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'paymongo'
                      ? 'border-maroon bg-maroon/5'
                      : 'border-gray-200 hover:border-maroon/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className={`h-5 w-5 ${paymentMethod === 'paymongo' ? 'text-maroon' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <p className="font-medium">Secure Payments via GCash</p>
                      <p className="text-xs text-gray-500">Pay via GCash</p>
                    </div>
                  </div>
                  {paymentMethod === 'paymongo' && (
                    <div className="w-3 h-3 bg-maroon rounded-full"></div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-maroon bg-maroon/5'
                      : 'border-gray-200 hover:border-maroon/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      <p className="text-xs text-gray-500">Pay when you receive your order</p>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="w-3 h-3 bg-maroon rounded-full"></div>
                  )}
                </button>
              </div>

              {paymentMethod === 'paymongo' && (
                <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  You'll be redirected to complete your GCash payment after placing your order.
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-serif font-bold text-maroon mb-4">Order Summary</h2>

              <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.productId || Math.random().toString()} className="flex items-center justify-between text-sm border-b border-gray-100 pb-3">
                      <div>
                        <p className="font-medium text-gray-800">{getItemName(item)}</p>
                        <div className="flex items-center gap-2 text-gray-500">
                          <button
                            onClick={() => handleQuantityChange(item.productId, Math.max(1, (item.quantity || 0) - 1))}
                            className="hover:text-maroon transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span>{item.quantity || 0}</span>
                          <button
                            onClick={() => handleQuantityChange(item.productId, (item.quantity || 0) + 1)}
                            className="hover:text-maroon transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-red-400 hover:text-red-600 transition ml-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">{formatPrice(getItemPrice(item))}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No items in cart</p>
                )}
              </div>

              {deliveryMethod === 'pickup' && formData.selectedBranch && (
                <div className="bg-maroon/5 rounded-xl p-3 mb-3 border border-maroon/20">
                  <div className="flex items-start gap-2">
                    <Store className="h-4 w-4 text-maroon mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-maroon">Pickup Location</p>
                      <p className="text-xs text-gray-600">
                        {getBranchDetails(formData.selectedBranch)?.name} - {getBranchDetails(formData.selectedBranch)?.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems || 0} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryMethod === 'pickup' ? '₱0' : '₱50'}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-maroon pt-4 border-t border-gray-200 mt-4">
                <span>Total</span>
                <span>{formatPrice(totalWithDelivery)}</span>
              </div>

              <button
                onClick={handlePayNow}
                disabled={isSubmitting || items.length === 0 || (deliveryMethod === 'pickup' && !formData.selectedBranch)}
                className="w-full bg-maroon text-white py-3 rounded-full font-semibold hover:bg-maroon-dark transition-all duration-300 hover:scale-105 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Pay now'}
              </button>

              <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
                <Link href="#" className="hover:text-maroon transition">Refund policy</Link>
                <span>|</span>
                <Link href="#" className="hover:text-maroon transition">Shipping</Link>
                <span>|</span>
                <Link href="#" className="hover:text-maroon transition">Terms of service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}