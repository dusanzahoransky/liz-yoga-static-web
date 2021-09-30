export default class EnquiryService {

    async handleEnquirySubmit(yogaClass, event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        if (!data.mobile) {
            return alert('Please fill up your phone number.')
        } else if (!data.enquiry) {
            return alert('Please fill up your enquiry.')
        } else {
            await this.postEnquiry(data)
        }
    }

    async postEnquiry(yogaClass, enquiry) {
        enquiry.yogaClass = yogaClass

        const enquiryPath = 'https://uc2iohbbzc.execute-api.ap-southeast-2.amazonaws.com/prod/';
        const body = JSON.stringify(enquiry);
        console.log(`Calling POST ${enquiryPath}: ${body}`)

        const response = await fetch(enquiryPath, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body
        })

        if (!response.ok) {
            console.error(`RESPONSE: ${response.status}`)
            return alert('Failed to send you enquiry, please try again later.')
        }
        console.log(`RESPONSE: ${response.status}: ${await response.json()}`)
        return alert('Thank you for your enquiry, I will be in touch with you soon!')
    }

}

