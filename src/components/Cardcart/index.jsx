import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ContextDataItem } from '../../config'

export default function Index(props) {
    const product = props.data
    const data = ContextDataItem()

    const [qty, setQty] = useState(1)
    const [note, setNote] = useState('')
    const [notes, setisnotes] = useState(false)
    const [remove, setRemove] = useState(false)

    const plusQty = () => {
        data.setCart(
            data.cart.map((item) => {
                console.log(item)
                if (item.id === product.id) {
                    return { ...item, qty: product.qty + 1 }
                } else {
                    return item;
                }
            })
        );
    }

    const minQty = () => {
        data.setCart(
            data.cart.map((item) => {
                console.log(item)
                if (item.id === product.id) {
                    return { ...item, qty: product.qty - 1 }
                } else {
                    return item;
                }
            })
        );
    }

    const checked = () => {
        data.setCart(
            data.cart.map((item) => {
                if (item.id === product.id) {
                    return { ...item, checked: !product.checked }
                } else {
                    return item
                }
            })
        )



    }

    const removeCart = () => {
        setRemove(true)

        data.setCart(
            data.cart.filter((item) => {
                return item.title !== product.title
            }),

        )

    }

    // const grandTot = store.cart.reduce((prev, curr) => {
    //     curr.checked === true ? `${prev + curr.grandprice}` : 0
    // })

    // console.log(grandTot);



    useEffect(() => {
        data.setCart(
            data.cart.map((item) => {
                if (item.id === product.id) {
                    return { ...item, grandprice: item.qty * item.subprice }
                } else {
                    return item;
                }
            })
        );

    }, [product.qty])

    // useEffect(() => {
    //     data.setGrandTotal(
    //          data.cart.reduce((prev, curr) => prev + curr.grandprice)

    //     )

    // }, [product.checked])



    // console.log(remove);
    return (
        <div className='flex flex-col shadow-lg p-6 hover:bg-slate-100'>
            {remove == true ? alert('product deleted!', setRemove(false)) : ''}
            <div className='flex items-center gap-3'>
                <input type="checkbox" name="checked" checked={product.checked === true} onClick={checked} className='w-4 h-4' />

                <LazyLoadImage
                    effect='opacity'
                    src={product.image}
                    alt=""
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                    className='rounded-t-md'
                />

                <div>
                    <p className='font-primary mb-2'>{product.title}</p>
                    <p className='font-primary text-slate-900 font-semibold'>$ {product.grandprice}</p>
                </div>
            </div>


            <div className='flex items-center justify-between mt-2'>
                {/* NOTES */}
                {notes ?
                    <div>
                        <input className='border border-primary w-full rounded-lg p-2 mt-3 text-gray-700 font-primary' type="text" placeholder='Example : White Color' onChange={() => setNote()} />
                        <button onClick={() => setisnotes(false)} >Cancel</button>
                    </div> :
                    <button onClick={() => setisnotes(true)} className='text-primary font-medium flex my-3 gap-1'>
                        <svg className='w-5' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                        </svg><p>Notes</p>
                    </button>
                }

                <div className='flex items-center gap-12'>
                    {/* REMOVE */}
                    <button onClick={removeCart}><svg className='w-5' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                    </svg></button>

                    {/* QTY */}
                    <div className='flex w-28 border border-primary rounded-lg justify-around items-center py-1'>
                        <button disabled={product.qty == 1}
                            className={`text-lg ${product.qty == 1 ? 'cursor-not-allowed' : ''} `}
                            onClick={minQty} >-</button>
                        <p>{product.qty}</p>
                        <button onClick={plusQty} className='text-lg'>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
