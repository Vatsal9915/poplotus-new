export default function ContactMap() {
  return (
    <section className="py-20 bg-beige/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're located in Kolkata, West Bengal. Drop by for a visit or to discuss potential partnerships.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0123456789!2d88.3639!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d7f0123456%3A0x123456789abcdef!2s7%2C%20Bangur%20Ave%2C%20Block%20D%2C%20Kolkata%2C%20West%20Bengal%20700055%2C%20India!5e0!3m2!1sen!2sus!4v1647834567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PopLotus Office Location - Kolkata"
            />
          </div>

          <div className="p-8 bg-white">
            <div className="mb-8 text-center">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">Our Address</h3>
              <p className="text-gray-600 text-lg">
                7, Bangur Avenue, Block D<br />
                Kolkata, West Bengal - 700055
                <br />
                India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">Easy Access</h3>
                <p className="text-gray-600 text-sm">
                  Located in Bangur Avenue with easy access to public transportation and parking
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">Modern Facility</h3>
                <p className="text-gray-600 text-sm">
                  State-of-the-art production facility with visitor-friendly areas
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">Appointment Preferred</h3>
                <p className="text-gray-600 text-sm">
                  Please call ahead to ensure someone is available to meet with you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
