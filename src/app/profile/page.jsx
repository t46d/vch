"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Edit, Trash, Phone, MessageSquare, Instagram, Twitter, Globe, Plus } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'WhatsApp', value: '+1234567890', icon: Phone },
    { id: 2, platform: 'Telegram', value: '@username', icon: MessageSquare },
    { id: 3, platform: 'Instagram', value: '@instagram', icon: Instagram },
  ]);

  const userProfile = {
    name: 'Sophia',
    age: 24,
    country: 'United States',
    bio: 'Adventurous soul who loves traveling, photography, and meeting new people. Always up for a good conversation!',
    interests: ['Travel', 'Photography', 'Music', 'Art', 'Food'],
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const addSocialLink = () => {
    const newLink = {
      id: socialLinks.length + 1,
      platform: 'New Platform',
      value: '',
      icon: Globe
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const updateSocialLink = (id, field, value) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 mb-4">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-6xl font-bold">{userProfile.name.charAt(0)}</span>
                  </div>
                )}
                
                {/* Image Upload Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer p-4 bg-purple-600 rounded-full hover:bg-purple-700">
                    <Camera size={24} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-700">
                  <Camera size={18} />
                  Upload
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                
                {profileImage && (
                  <button 
                    onClick={removeImage}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <Trash size={18} />
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">{userProfile.name}, {userProfile.age}</h2>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <Edit size={18} />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={18} />
                  <span className="text-gray-300">{userProfile.country}</span>
                </div>
                <p className="text-gray-300">{userProfile.bio}</p>
              </div>

              {/* Interests */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {userProfile.interests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-purple-500/20 border border-purple-500 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  <button className="px-4 py-2 border border-dashed border-gray-500 rounded-full hover:border-purple-500">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Social Media Links</h2>
            <button 
              onClick={addSocialLink}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              <Plus size={18} />
              Add Link
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <div key={link.id} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Icon size={20} />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={link.platform}
                          onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                          className="bg-transparent text-lg font-bold border-none focus:outline-none"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeSocialLink(link.id)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={link.value}
                    onChange={(e) => updateSocialLink(link.id, 'value', e.target.value)}
                    placeholder="Enter your link/username"
                    className="w-full px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                  />
                  
                  {link.platform === 'WhatsApp' && link.value && (
                    <a
                      href={`https://wa.me/${link.value.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 px-4 py-2 bg-green-600 text-center rounded-lg hover:bg-green-700"
                    >
                      Chat on WhatsApp
                    </a>
                  )}
                  
                  {link.platform === 'Telegram' && link.value && (
                    <a
                      href={`https://t.me/${link.value.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 px-4 py-2 bg-blue-500 text-center rounded-lg hover:bg-blue-600"
                    >
                      Message on Telegram
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 p-6 bg-red-900/30 border border-red-700 rounded-2xl">
          <h3 className="text-xl font-bold mb-2 text-red-300">⚠️ Important Notice</h3>
          <p className="text-gray-300">
            • This platform is for adults 18+ only<br/>
            • Never share personal financial information<br/>
            • Report any suspicious behavior immediately<br/>
            • Your safety is our priority
          </p>
        </div>
      </div>
    </div>
  );
}
