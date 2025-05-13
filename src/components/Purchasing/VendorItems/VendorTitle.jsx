import { Edit, Close } from '../../../icons';
import { Link } from 'react-router';

import { useCallback, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

const VendorTitle = (props) => {
    const {vendor, vendorName, phone, accountNum, clicked} = props

    const [editActive, setEditActive] = useState(false);


    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newAccountNum, setNewAccount] = useState('');


    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])

    const handleVendorTitleUpdate = useCallback(async (event) => {
        event.preventDefault();
 
        let nameUpdate;
        let phoneUpdate;
        let accountUpdate;
        
        if(newName =='' && newPhone =='' && newAccountNum==''){
            toast.error("Fill out at least one field");
        }
        else{
        if(newName == ''){
            nameUpdate = vendorName;
        }
        else {
            nameUpdate = newName;
        }

        if(newPhone == ''){
            phoneUpdate = phone;
        }else {
            phoneUpdate = newPhone;
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

        try{
            await axios.put(`Vendor/${vendor.businessEntityId}`, updateVendor)
                    .then(resp => {
                        toast.success("Data Submitted");
                    })
                    .catch(err => {
                        toast.error(err);
                    });

            await handleEdit();

            await props.updateVendorTitle(updateVendor.vendorName, phoneUpdate, updateVendor.businessEntityId, updateVendor.accountNumber);
        }
        catch(err){
            toast.error(err);
        }
    }

    }, [setNewName, setNewPhone, setNewAccount, newName, newPhone, newAccountNum])

    const currentData = 
            <>
                <div>
                    <h1>{vendorName}</h1>
                    <p onClick={handleEdit}><Edit /></p>

                    <Link onClick={clicked} to="/purchasing"><Close /></Link>
                </div>

                <p>Phone: {phone}</p>
                <p>Business ID: {accountNum}</p>
            </>;

    const formData = 
                <form onSubmit={handleVendorTitleUpdate}>
                    <label>
                        <input type="text" name="vendorName" aria-label="vendorName" placeholder={vendorName}
                            value={newName} onChange={evt => setNewName(evt.target.value)} />
                    </label>
                    <label>
                        <input type="text" name="accountNumber" aria-label="account" placeholder={accountNum} 
                            value={newAccountNum} onChange={evt => setNewAccount(evt.target.value)}/>
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