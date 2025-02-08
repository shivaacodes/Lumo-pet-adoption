"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

const adoptionRequests = [
  {
    id: 1,
    adopter: "John Doe",
    email: "johndoe@example.com",
    pet: {
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
      image: "/images/dog1.jpg",
    },
    status: "pending",
    message: "I have a spacious home and would love to adopt Buddy.",
  },
  {
    id: 2,
    adopter: "Emily Smith",
    email: "emily.smith@example.com",
    pet: {
      name: "Whiskers",
      breed: "Persian Cat",
      age: "3 years",
      image: "/images/cat1.jpg",
    },
    status: "approved",
    message:
      "I have always loved Persian cats, and I am excited to adopt Whiskers.",
  },
  {
    id: 3,
    adopter: "Michael Brown",
    email: "michael.b@example.com",
    pet: {
      name: "Rocky",
      breed: "German Shepherd",
      age: "1.5 years",
      image: "/images/dog2.jpg",
    },
    status: "rejected",
    message: "I believe Rocky would be a great companion for my family.",
  },
];

const RequestsPage = () => {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(adoptionRequests);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  const filteredRequests = (status) =>
    requests.filter(
      (req) =>
        req.status === status &&
        req.adopter.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Adoption Requests
      </h1>
      <Input
        placeholder="Search requests by adopter name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full max-w-md"
      />

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex gap-2 mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {/* Pending Requests */}
        <TabsContent value="pending">
          {filteredRequests("pending").length ? (
            filteredRequests("pending").map((req) => (
              <RequestCard
                key={req.id}
                req={req}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          ) : (
            <p className="text-gray-500">No pending requests.</p>
          )}
        </TabsContent>

        {/* Approved Requests */}
        <TabsContent value="approved">
          {filteredRequests("approved").length ? (
            filteredRequests("approved").map((req) => (
              <RequestCard key={req.id} req={req} />
            ))
          ) : (
            <p className="text-gray-500">No approved requests.</p>
          )}
        </TabsContent>

        {/* Rejected Requests */}
        <TabsContent value="rejected">
          {filteredRequests("rejected").length ? (
            filteredRequests("rejected").map((req) => (
              <RequestCard key={req.id} req={req} />
            ))
          ) : (
            <p className="text-gray-500">No rejected requests.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Request Card Component
const RequestCard = ({ req, onApprove, onReject }) => {
  return (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex items-center gap-4">
        <Avatar className="w-12 h-12" src={req.pet.image} alt={req.pet.name} />
        <div>
          <h2 className="text-lg font-semibold">{req.pet.name}</h2>
          <p className="text-sm text-gray-500">
            {req.pet.breed} · {req.pet.age}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-gray-900">
          <strong>Adopter:</strong> {req.adopter} ({req.email})
        </p>
        <p className="text-gray-700">{req.message}</p>
        <Badge
          variant={
            req.status === "approved"
              ? "success"
              : req.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
        </Badge>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {req.status === "pending" && (
          <>
            <Button variant="success" onClick={() => onApprove(req.id)}>
              Approve
            </Button>
            <Button variant="destructive" onClick={() => onReject(req.id)}>
              Reject
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default RequestsPage;
