class ContactsController < ApplicationController
    # GET request to /contact-us
    # show new contact form
    def new
        @contact = Contact.new
    end
    
    # POST request /contacts
    def create
        # mass assignment of form fields into Contact object
        @contact =Contact.new(contact_params)
        if @contact.save
            # Store form fields via parameter
            name = params[:contact][:name]
            email = params[:contact][:email]
            body = params[:contact][:comments]
            
            # plug variables into contact mailer 
            # email method and send
            ContactMailer.contact_email(name, email, body).deliver
            
            # store success message and flash hash
            # and redirect to new action
            flash[:success] = "Message sent"
            redirect_to new_contact_path
        else
            # if Contact object doesn't save,
            # store errors in flash hash
            # and redirect to new action
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
        end
    end       


private
    # to collect data from form we need
    # to use strong parameters
    # and whitelist form fields
    
    def contact_params
        params.require(:contact).permit(:name, :email, :comments)
    end
end
