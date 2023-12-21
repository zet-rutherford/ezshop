import {Routes, Route} from 'react-router-dom'

import GetAllInvoices from '../views/invoices/GetAllInvoices'

const Invoices = () => {
    return(
        <>
        <Routes>
            <Route path='/all-invoices' element={<GetAllInvoices/>}></Route>
        </Routes>
        </>
    )

}

export default Invoices