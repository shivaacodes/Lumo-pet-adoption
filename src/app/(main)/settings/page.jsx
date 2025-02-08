"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleDarkModeToggle = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      } p-8 transition-colors duration-300`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className={`text-4xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Settings
        </h1>
        <p
          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-700"}`}
        >
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <Card className="mb-8 p-6 flex items-center gap-6">
        <Avatar
          className="w-20 h-20"
          src="/public/images/profile-icon.jpg"
          alt="Profile"
        />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Shiva Sajay</span>
          <span className="text-sm text-gray-500">shivasajay007@gmail.com</span>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="mb-8 p-6">
        <h2
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Account Settings
        </h2>
        <div className="space-y-6 mt-4">
          <div className="flex justify-between items-center">
            <span
              className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              shivasajay007@gmail.com
            </span>
            <Dialog
              open={isEmailDialogOpen}
              onOpenChange={setIsEmailDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Change Email
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Change Email</DialogTitle>
                <DialogDescription>
                  Enter your new email address below.
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex justify-between items-center">
            <span
              className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              dbms1234
            </span>
            <Dialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Enter your current and new password.
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card className="mb-8 p-6">
        <h2
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Preferences
        </h2>
        <div className="space-y-6 mt-4">
          <div className="flex justify-between items-center">
            <span
              className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Dark Mode
            </span>
            <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="mb-8 p-6">
        <h2
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Notification Settings
        </h2>
        <div className="space-y-6 mt-4">
          <div className="flex justify-between items-center">
            <span
              className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Email Notifications
            </span>
            <Button
              variant="outline"
              onClick={() => alert("Email Notifications Changed")}
              size="sm"
            >
              Enable
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              SMS Notifications
            </span>
            <Button
              variant="outline"
              onClick={() => alert("SMS Notifications Changed")}
              size="sm"
            >
              Enable
            </Button>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <div className="flex justify-center mt-8">
        <Button
          variant="destructive"
          onClick={() => alert("Logging out...")}
          size="lg"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
