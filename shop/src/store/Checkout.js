export const CheckoutModule = {
    namespaced: true,
    state: {
        customerDetails: {
            name: null,
            email: null,
            phoneNo: null,
            phoneNoMin: 6,
            phoneNoMax: 20,
            address: {
                line1: null,
                line2: null,
                zipCode: null,
                city: null,
                division: null,
                country: null,
            },
        },
        shipping: {
            cost: 4,
            selectedMethod: "shippingMethod1",
            options: [
                {
                    text: "Ship to My Billing Address",
                    value: "shippingMethod1",
                },
            ],
        },
        payment: {
            selectedMethod: "stripe",
            options: [
                {
                    text: "Stripe Payment Method",
                    value: "stripe",
                },
            ],
        }
    },
    mutations: {
        SET_CUSTOMER_NAME(state, name) {
            state.customerDetails.name = name
        },
        SET_CUSTOMER_EMAIL(state, email) {
            state.customerDetails.email = email
        },
        SET_CUSTOMER_PHONE_NO(state, phoneNo) {
            state.customerDetails.phoneNo = phoneNo
        },
        SET_CUSTOMER_ADDRESS_LINE1(state, line1) {
            state.customerDetails.address.line1 = line1
        },
        SET_CUSTOMER_ADDRESS_LINE2(state, line2) {
            state.customerDetails.address.line2 = line2
        },
        SET_CUSTOMER_ADDRESS_ZIP_CODE(state, zipCode) {
            state.customerDetails.address.zipCode = zipCode
        },
        SET_CUSTOMER_ADDRESS_CITY(state, city) {
            state.customerDetails.address.city = city
        },
        SET_CUSTOMER_ADDRESS_DIVISION(state, division) {
            state.customerDetails.address.division = division
        },
        SET_CUSTOMER_ADDRESS_COUNTRY(state, country) {
            state.customerDetails.address.country = country
        }
    },
    actions: {
        clearCustomerDetails({ commit }) {
            const emptyString = ""
            commit("SET_CUSTOMER_NAME", emptyString)
            commit("SET_CUSTOMER_EMAIL", emptyString)
            commit("SET_CUSTOMER_PHONE_NO", emptyString)
            commit("SET_CUSTOMER_ADDRESS_LINE1", emptyString)
            commit("SET_CUSTOMER_ADDRESS_LINE2", emptyString)
            commit("SET_CUSTOMER_ADDRESS_ZIP_CODE", emptyString)
            commit("SET_CUSTOMER_ADDRESS_CITY", emptyString)
            commit("SET_CUSTOMER_ADDRESS_DIVISION", emptyString)
            commit("SET_CUSTOMER_ADDRESS_COUNTRY", emptyString)
        },
        validPhoneNo({ state }) {
            const formatNumber = /^[0-9+-]+$/

            if (
                state.customerDetails.phoneNo.length >= state.customerDetails.phoneNoMin &&
                state.customerDetails.phoneNo.length <= state.customerDetails.phoneNoMax &&
                formatNumber.test(state.customerDetails.phoneNo)
            )
                return true;
            else return false;
        },
        validEmail({ state }) {
            const formatEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            if (formatEmail.test(state.customerDetails.email)) {
                return true;
            } else return false;
        },
        informationValidate({ dispatch, state }) {
            if (!state.customerDetails.name ||
                !dispatch("validPhoneNo") ||
                !dispatch("validEmail")) {
                console.log("customer details invalid")
                return false;
            }
            else if (
                state.customerDetails.address.line1 == "" ||
                state.customerDetails.address.line2 == "" ||
                state.customerDetails.address.zipCode == "" ||
                state.customerDetails.address.city == "" ||
                state.customerDetails.address.division == "" ||
                state.customerDetails.address.country == ""
            ) {
                console.log("shipping details invalid")

                return false;
            }
            else {
                var i, shippingAddress = ""
                for (i in state.customerDetails.address) {
                    if (i == "zipCode") {
                        shippingAddress += "<b>zip code:</b> " + state.customerDetails.address[i] + "<br/>"
                        continue;
                    }
                    shippingAddress += "<b>" + i + ":</b> " + state.customerDetails.address[i] + "<br/>"
                }
                const data = {
                    name: state.customerDetails.name,
                    email: state.customerDetails.email,
                    phoneNo: state.customerDetails.phoneNo,
                    shippingAddress: shippingAddress
                }
                return data
            }
        },
        setCustomerName({ commit }, name) {
            commit("SET_CUSTOMER_NAME", name)
        },
        setCustomerEmail({ commit }, email) {
            commit("SET_CUSTOMER_EMAIL", email)
        },
        setCustomerPhoneNo({ commit }, phoneNo) {
            commit("SET_CUSTOMER_PHONE_NO", phoneNo)
        },
        setCustomerAddressLine1({ commit }, line1) {
            commit("SET_CUSTOMER_ADDRESS_LINE1", line1)
        },
        setCustomerAddressLine2({ commit }, line2) {
            commit("SET_CUSTOMER_ADDRESS_LINE2", line2)
        },
        setCustomerAddressZipCode({ commit }, zipCode) {
            commit("SET_CUSTOMER_ADDRESS_ZIP_CODE", zipCode)
        },
        setCustomerAddressCity({ commit }, city) {
            commit("SET_CUSTOMER_ADDRESS_CITY", city)
        },
        setCustomerAddressDivision({ commit }, division) {
            commit("SET_CUSTOMER_ADDRESS_DIVISION", division)
        },
        setCustomerAddressCountry({ commit }, country) {
            commit("SET_CUSTOMER_ADDRESS_COUNTRY", country)
        }
    },
    modules: {}
}