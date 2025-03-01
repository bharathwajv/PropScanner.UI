// components/PropertyDetailsModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Heart, Scale, MapPin, Calendar, Home, Ruler } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/lib/redux/favoritesSlice';
import { addToCompare } from '@/lib/redux/compareSlice';
import { RootState } from '@/lib/redux/store';
import { cn } from "@/lib/utils";
import { toast } from 'react-hot-toast';
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    image: string;
    title: string;
    price: number;
    specs: {
      beds: number;
      baths: number;
      area: string;
    };
    has360Tour?: boolean;
  };
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ isOpen, onClose, property }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => state.favorites.ids.includes(property.id));
  const compareIds = useSelector((state: RootState) => state.compare.ids);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(property.id));
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (compareIds.length < 3) {
      dispatch(addToCompare(property.id));
      toast.success('Added to compare');
    } else {
      toast.error('You can compare up to 3 properties at a time');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[100vw] h-[100vh] p-0 border-none bg-background">
        <motion.div
          layoutId={`property-${property.id}`}
          className="h-full w-full overflow-y-auto"
        >
          <div className="relative">
            <motion.div
              layoutId={`property-image-${property.id}`}
              className="relative h-[50vh] md:h-[60vh]"
            >
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {property.has360Tour && (
                <Badge variant="secondary" className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  <Eye className="w-4 h-4 mr-1" />
                  360°
                </Badge>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
            </motion.div>
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-background/50 backdrop-blur-sm text-white hover:bg-background/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                className={cn(
                  "p-2 rounded-full transition-colors backdrop-blur-sm",
                  compareIds.includes(property.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 text-white hover:bg-background/70"
                )}
                onClick={handleAddToCompare}
              >
                <Scale className="w-5 h-5" />
              </button>
              <button
                className={cn(
                  "p-2 rounded-full transition-colors backdrop-blur-sm",
                  isFavorite
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 text-white hover:bg-background/70"
                )}
                onClick={handleToggleFavorite}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
            <div className="bg-card rounded-t-3xl p-8 shadow-xl space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <motion.h2
                    layoutId={`property-title-${property.id}`}
                    className="text-3xl font-semibold text-foreground mb-2"
                  >
                    {property.title}
                  </motion.h2>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>123 Example Street, City, State</span>
                  </div>
                </div>
                <motion.div
                  layoutId={`property-price-${property.id}`}
                  className="text-3xl font-semibold text-primary"
                >
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(property.price)}

                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Home className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <div className="text-xl font-medium">{property.specs.beds}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Calendar className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <div className="text-xl font-medium">{property.specs.baths}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Ruler className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <div className="text-xl font-medium">{property.specs.area}</div>
                    <div className="text-sm text-muted-foreground">Area</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  This beautiful property features modern amenities and a spacious layout.
                  Perfect for families or professionals looking for comfort and style.
                  The property has been recently renovated and is move-in ready.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Features</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg">
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Modern Kitchen
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Central Air
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Hardwood Floors
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Garage
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Garden
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Security System
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;