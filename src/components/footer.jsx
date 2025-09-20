import { Mail } from 'lucide-react';

export default function Footer() {

  const footertext = {
    head:'About this site',
    text:'Your voice. Your vibe. Your platform'
  }

  return (
    <footer className="bg-slate-900 text-xs text-slate-300 py-10 px-8  md:px-20">
      <div className="grid-cols-2 gap-2 md:grid-cols-2 gap-2">
        
        {/* Left side - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
         
          <div>
          <Mail className='inline w-4 ml-2 ' />
          <a href="mailto:thelocaltales98@gmail.com" className='ml-2 underline'>thelocaltales98@gmail.com</a>
          </div>
        </div>

        {/* Right side - About + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{footertext.head}</h3>
          <p className="text-sm mb-4">
            {footertext.text}
          </p>
         
        </div>

      </div>
      
    </footer>
  );
}
