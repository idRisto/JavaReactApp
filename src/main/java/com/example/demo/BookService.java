package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

  @Autowired
  private BookRepository bookRepo;

  public List<Book> getBooks() {
    return (List<Book>) bookRepo.findAll();
  }

  public Optional<Book> getBookById(int id) {
    return bookRepo.findById(id);
  }

  public boolean addBookToDb(String author, String title, String desc) {
    Book b = new Book(title, author, desc);
    bookRepo.save(b);
    return true;
  }

  public boolean deleteBook(int id) {
    bookRepo.deleteById(id);
    return true;
  }

  public boolean updateBook(int id, String author, String title, String desc) {
    Book bookInDb = bookRepo.findById(id).get();
    bookInDb.setTitle(title);
    bookInDb.setAuthor(author);
    bookInDb.setDescription(desc);
    bookRepo.save(bookInDb);
    return true;
  }
  
}
