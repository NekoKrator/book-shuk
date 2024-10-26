import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { BookTypes } from '../types/types'
import { Link } from 'react-router-dom'

interface BookDialogProps {
    isOpen: boolean
    onClose: () => void
    book: BookTypes | null
}

const BookDialog: React.FC<BookDialogProps> = ({ isOpen, onClose, book }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="mb-3">{book?.title}</DialogTitle>
                    <DialogDescription>
                        <div className="flex">
                            <img src={book?.smallImage || '/default-image.jpg'} alt={book?.title} className="w-32 h-48 mr-4 object-cover" />
                            <div>
                                <h4 className="font-semibold">{book?.author}</h4>
                                <p>
                                    The book is held by:{' '}
                                    {book?.users && book.users.length > 0
                                        ? book.users.map((user, index) => (
                                              <React.Fragment key={user._id}>
                                                  <Link to={`/users/${user.username}`} className="text-blue-500 hover:underline">
                                                      {user.username}
                                                  </Link>
                                                  {index < book.users.length - 1 && ', '}
                                              </React.Fragment>
                                          ))
                                        : 'No users found'}
                                </p>
                                <p className="mt-3">Click on the user's nickname to exchange this book with them.</p>
                                <p className="mt-3">{book?.tags?.join(', ')}</p>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <button className="mt-4 btn btn-secondary">Close</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default BookDialog
