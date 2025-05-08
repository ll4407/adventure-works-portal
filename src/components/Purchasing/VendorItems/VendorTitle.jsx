import { Edit, Close } from '../../../icons';
import { Link } from 'react-router';
import { useCallback, useState } from 'react';

function VendorTitle(props){
    const {vendorName, phone, businessEntityId} = props

    const [editActive, setEditActive] = useState(false)

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])

    const currentData = 
            <>
                <div>
                    <h1>{vendorName}</h1>
                    <p onClick={handleEdit}><Edit /></p>

                    <Link to="/purchasing"><Close /></Link>
                </div>

                <p>Phone: {phone}</p>
                <p>Business ID: {businessEntityId}</p>
            </>;

    const formData = 
            <>  
                <form>
                    <label>
                        <input type="text" name="vendorName" aria-label="vendorName" placeholder={vendorName} />
                    </label>
                    <label>
                        <input type="text" name="Phone" aria-label="Phone" placeholder={phone} />
                    </label>
                    <label>
                        <input type="text" name="BusinessID" aria-label="Business ID" placeholder={businessEntityId} />
                    </label>

                    <button type='Submit'>Save Changes</button>
                    
                    <p onClick={handleEdit}>Back</p>
                </form>
            </>;

    const dataDisplay = editActive === false ? currentData : formData;

    return(
        dataDisplay
    )
}

export default VendorTitle;