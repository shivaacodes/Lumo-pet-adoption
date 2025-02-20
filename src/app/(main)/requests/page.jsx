"use client";

import { useState } from "react";
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Check,
  X,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  User,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const adoptionRequests = [
  {
    id: 1,
    adopter: "Shiva Sajay",
    email: "johndoe@example.com",
    pet: {
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
    },
    status: "pending",
    message: "I have a spacious home and would love to adopt Buddy.",
    submittedAt: "2024-02-15",
  },
  {
    id: 2,
    adopter: "Yadhu Krishnan",
    email: "emily.smith@example.com",
    pet: {
      name: "Whiskers",
      breed: "Persian Cat",
      age: "3 years",
    },
    status: "approved",
    message:
      "I have always loved Persian cats, and I am excited to adopt Whiskers.",
    submittedAt: "2024-02-14",
  },
  {
    id: 3,
    adopter: "Vishnu P Venmany",
    email: "michael.b@example.com",
    pet: {
      name: "Rocky",
      breed: "German Shepherd",
      age: "1.5 years",
    },
    status: "rejected",
    message: "I believe Rocky would be a great companion for my family.",
    submittedAt: "2024-02-13",
  },
];

const RequestsPage = () => {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(adoptionRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

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
        (req.adopter.toLowerCase().includes(search.toLowerCase()) ||
          req.pet.name.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="p-8 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Adoption Requests
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and review adoption applications
            </p>
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Bulk Message
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Input
            placeholder="Search by adopter or pet name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Recent First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>By Pet Type</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({filteredRequests("pending").length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Approved ({filteredRequests("approved").length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Rejected ({filteredRequests("rejected").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="grid gap-4">
              {filteredRequests("pending").length ? (
                filteredRequests("pending").map((req) => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onSelect={setSelectedRequest}
                  />
                ))
              ) : (
                <EmptyState status="pending" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <div className="grid gap-4">
              {filteredRequests("approved").length ? (
                filteredRequests("approved").map((req) => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onSelect={setSelectedRequest}
                  />
                ))
              ) : (
                <EmptyState status="approved" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="grid gap-4">
              {filteredRequests("rejected").length ? (
                filteredRequests("rejected").map((req) => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onSelect={setSelectedRequest}
                  />
                ))
              ) : (
                <EmptyState status="rejected" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <RequestDialog
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};

const RequestCard = ({ req, onApprove, onReject, onSelect }) => {
  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    approved:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarFallback className="bg-primary/5 text-primary">
            {req.adopter
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {req.adopter}
            </h2>
            <Badge variant={req.status} className={statusColors[req.status]}>
              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Interested in adopting {req.pet.name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{req.pet.breed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{req.pet.age}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm leading-relaxed">{req.message}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Submitted on {new Date(req.submittedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => onSelect(req)}
        >
          <MessageSquare className="h-4 w-4" />
          View Details
        </Button>

        {req.status === "pending" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => onApprove(req.id)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onReject(req.id)}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertCircle className="mr-2 h-4 w-4" />
              Report Issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

const RequestDialog = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <Dialog open={!!request} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adoption Request Details</DialogTitle>
          <DialogDescription>
            Complete information about the adoption request
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Adopter Information</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {request.adopter}
                </p>
                <p>
                  <strong>Email:</strong> {request.email}
                </p>
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(request.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Pet Information</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {request.pet.name}
                </p>
                <p>
                  <strong>Breed:</strong> {request.pet.breed}
                </p>
                <p>
                  <strong>Age:</strong> {request.pet.age}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Message</h3>
            <p className="text-sm text-muted-foreground">{request.message}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onClose()}>
            Close
          </Button>
          <Button>Send Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EmptyState = ({ status }) => {
  const messages = {
    pending: "No pending requests to review",
    approved: "No approved requests yet",
    rejected: "No rejected requests",
  };

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        {status === "pending" && (
          <Clock className="h-6 w-6 text-muted-foreground" />
        )}
        {status === "approved" && (
          <Check className="h-6 w-6 text-muted-foreground" />
        )}
        {status === "rejected" && (
          <X className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-medium">{messages[status]}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        When new requests come in, they will appear here
      </p>
    </div>
  );
};

export default RequestsPage;
