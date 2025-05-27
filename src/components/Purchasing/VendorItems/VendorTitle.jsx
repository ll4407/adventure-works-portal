import { Edit, Close } from '../../../icons';
import { Link } from 'react-router';

import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

const VendorTitle = (props) => {
    const {vendor, vendorName, phone, accountNum, clicked, updateVendorInfo, vendorUpdateMethod} = props

    const [editActive, setEditActive] = useState(false);


    const [newName, setNewName] = useState('');
    const [newAccountNum, setNewAccount] = useState('');

    useEffect(()=>{
        setNewName(vendorName);
        setNewAccount(accountNum);
    },[]);


    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])

    const handleVendorTitleUpdate = useCallback(async (event) => {
        event.preventDefault();
 
        let nameUpdate;
        let accountUpdate;
        
        if(newName =='' && newAccountNum==''){
            toast.error("Fill out at least one field");
        }
        else{
        if(newName == ''){
            nameUpdate = vendorName;
        }
        else {
            nameUpdate = newName;
        }
        if(newAccountNum == ''){
            accountUpdate = accountNum;
        }else {
            accountUpdate = newAccountNum;
        }



        const updateVendor = {
            businessEntityId: vendor.businessEntityId,
            accountNumber: accountUpdate,
            vendorName: nameUpdate,
            creditRating: vendor.creditRating
        }
        
        await axios.put(`Vendor/${vendor.businessEntityId}`, updateVendor)
            .then(() => {
                toast.success("Data Submitted");
            })
            .catch(err => {
                toast.error(err);
            });

        handleEdit();

        updateVendorInfo();
        vendorUpdateMethod();
    }

    }, [setNewName, setNewAccount, newName, newAccountNum])

    const currentData = 
            <>
                <div>
                    <h1>{vendorName}</h1>
                    <p onClick={handleEdit}><Edit /></p>

                    <Link onClick={clicked} to="/purchasing/vendors"><Close /></Link>
                </div>

                <p>Phone: {phone}</p>
                <p>Business ID: {accountNum}</p>
            </>;

    const formData = 
                <form onSubmit={handleVendorTitleUpdate}>
                    <label>
                        <input type="text" name="vendorName" aria-label="vendorName" value={newName} placeholder='Vendor Name'
                         onChange={evt => setNewName(evt.target.value)} />
                    </label>
                    <label>
                        <input type="text" name="accountNumber" aria-label="account" value={newAccountNum} placeholder='Account Number'
                            onChange={evt => setNewAccount(evt.target.value)}/>
                    </label>

                    <button type='submit'>Save Changes</button>
                    
                    <p onClick={handleEdit}>Cancel</p>
                </form>;

    const dataDisplay = editActive === false ? currentData : formData;

    return(
        dataDisplay
    )
}

export default VendorTitle;